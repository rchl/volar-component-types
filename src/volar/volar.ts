import path from 'path';
import fs from 'fs';
import { ScriptSnapshot } from 'typescript';
import { FileKind, MirrorBehaviorCapabilities, type Language } from '@volar/language-core';
import type { RangeMapping } from '../module/types';

const TYPE_DEFINITION_VIRTUAL_FILE_NAME = 'generated-component-types.d.ts'

const snapshotToMirrorMappings = new WeakMap();

function readComponentTypes(hostDirectory: string): { code: string; mappings: RangeMapping[] } {
    const componentDataFile = `${hostDirectory}/.nuxt/components/volar-component-data.json`;

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
            fileName: path.join(host.getCurrentDirectory(), TYPE_DEFINITION_VIRTUAL_FILE_NAME),
            _version: 0,
            _snapshot: ScriptSnapshot.fromString(''),
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
                        this._snapshot = ScriptSnapshot.fromString(code);
                        snapshotToMirrorMappings.set(this._snapshot, mirrorMappings);
                    }
                }
            },
            generateCodeAndMappings() {
                const hostDirectory = host.getCurrentDirectory();
                const { code, mappings } = readComponentTypes(hostDirectory);
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
export = languageModule
