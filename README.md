# Lss Userscript

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

## Installation

* UserScript Browser Addon deiner Wahl installiert
* [AAO Counter](apps/aao-counter/README.md)
    * https://greasyfork.org/de/scripts/510948-aao-counter
* [AAO Marker](apps/aao-marker/README.md)
    * https://greasyfork.org/de/scripts/511080-aao-marker
* [Mission Info](apps/mission-info/README.md)
  * https://greasyfork.org/de/scripts/523977-mission-info
* Mission Vehicle Filter
    * https://greasyfork.org/de/scripts/510949-mission-vehicle-filter
* Enhanced S5
    * https://greasyfork.org/de/scripts/510950-enhanced-s5


### Haftungsausschluss

Die Nutzung des Scripts geschieht auf eigene Gefahr. Ich hafte nicht für
eventuell auftretende Schäden oder Ähnliches, die durch die Nutzung dieses
Scripts entstanden sind. Die SHPlay GmbH ist in keinster Weise für den
Inhalt des Scripts verantwortlich. Das Script ist losgelöst von SHPlay
und Leitstellenspiel.de

## Developing

### Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
