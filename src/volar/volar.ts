import { posix } from 'path';
import fs from 'fs';
import type { IScriptSnapshot } from 'typescript';
import { FileKind, MirrorBehaviorCapabilities, type Language } from '@volar/language-core';
import type { RangeMapping } from '../module/types';

const TYPE_DEFINITION_VIRTUAL_FILE_NAME = 'generated-component-types.d.ts';

function scriptSnapshotFromString(text: string): IScriptSnapshot {
    return {
        getText: (start, end) => text.substring(start, end),
        getLength: () => text.length,
        getChangeRange: () => undefined,
    };
}

const snapshotToMirrorMappings = new WeakMap();

function readComponentTypes(workspacePath: string): { code: string; mappings: RangeMapping[] } {
    const componentDataFile = `${workspacePath}/.nuxt/components/volar-component-data.json`;

    try {
        return JSON.parse(fs.readFileSync(componentDataFile, { encoding: 'utf-8' }));
    } catch (error) {
        console.error((error as Error).message);
        return { code: '', mappings: [] };
    }
}

const languageModule: Language = {
    createVirtualFile(fileName, snapshot, _languageId) {
        if (fileName.endsWith(TYPE_DEFINITION_VIRTUAL_FILE_NAME)) {
            return {
                fileName,
                snapshot,
                kind: FileKind.TypeScriptHostFile,
                capabilities: {},
                embeddedFiles: [],
                mappings: [{
                    data: {},
                    sourceRange: [0, snapshot.getLength()],
                    generatedRange: [0, snapshot.getLength()],
                }],
                codegenStacks: [],
                mirrorBehaviorMappings: snapshotToMirrorMappings.get(snapshot),
            };
        }
    },
    updateVirtualFile(file, snapshot) {
        file.snapshot = snapshot;
        file.mappings = [{
            data: {},
            sourceRange: [0, snapshot.getLength()],
            generatedRange: [0, snapshot.getLength()],
        }];
        file.mirrorBehaviorMappings = snapshotToMirrorMappings.get(snapshot);
    },
    resolveHost(host) {
        const vueTypesScript = {
            projectVersion: '' as string | number,
            fileName: posix.join(host.rootPath, TYPE_DEFINITION_VIRTUAL_FILE_NAME),
            _version: 0,
            _snapshot: scriptSnapshotFromString(''),
            get version() {
                this.update();
                return this._version;
            },
            get snapshot() {
                this.update();
                return this._snapshot;
            },
            update() {
                if (!this._snapshot) {
                    return;
                }
                if (!host.getProjectVersion || host.getProjectVersion() !== this.projectVersion) {
                    this.projectVersion = host.getProjectVersion();
                    const { code, mirrorMappings } = this.generateCodeAndMappings();
                    if (code !== this._snapshot.getText(0, this._snapshot.getLength())) {
                        // console.error(code);
                        // console.error(mirrorMappings);
                        this._version++;
                        this._snapshot = scriptSnapshotFromString(code);
                        snapshotToMirrorMappings.set(this._snapshot, mirrorMappings);
                    }
                }
            },
            generateCodeAndMappings() {
                const { code, mappings } = readComponentTypes(host.rootPath);
                const mirrorMappings = mappings.map(mapping => ({
                    data: [MirrorBehaviorCapabilities.full, MirrorBehaviorCapabilities.full],
                    sourceRange: mapping[0],
                    generatedRange: mapping[1],
                }));
                return { code, mirrorMappings };
            },
        };

        return {
            ...host,
            getScriptFileNames() {
                return [
                    ...host.getScriptFileNames(),
                    vueTypesScript.fileName,
                ];
            },
            getScriptSnapshot(fileName) {
                if (fileName === vueTypesScript.fileName) {
                    return vueTypesScript.snapshot;
                }
                return host.getScriptSnapshot(fileName);
            },
        };
    },
};

// Not a "export default" so that it compiles to "module.exports".
export = languageModule;
