orion-cli
======

> Console scaffolding and development tool for Meteor Apps.


## How to install

```bash
npm install -g orion-cli
```

## How to use

### Creating apps

You can create meteor apps by using __orion create__, which downloads the [Meteor Boilerplate](https://github.com/matteodem/meteor-boilerplate).
__--blank__ or __-b__ let's you create a blank app (same as calling ```orion init```).

```bash
orion create meteorApp
orion create -b blankApp
```

If you have a proxy, you need to set the ``http_proxy`` variable to access the repository.

```bash
export http_proxy=http://myproxy.net:myport
```

### Reset apps

You can reset the app to remove all the default code.

```bash
orion reset
```

### Initializing exiting apps

Initialize Meteor Apps for use with scaffolding with following command.

```bash
cd existingMeteorApp
orion init
```

The resulting file orion-config.json under private/ has existing templates, list them by calling ```orion generate```. The configuration has following
structure.

```json
{
    "generate" : {
        "templateName" : {
            "default" : {
                "desc" : "description for template",
                "files" : ["private/templates/someFile.html"],
                "variables" : [
                    {
                        "name" : "templateVar",
                        "desc" : "templateQuestion"
                    }
                ]
            },
            "otherProfileName" : {
                "files" : ["private/templates/someOtherFile.html"]
            }
        }
    }
}
```

The template file also has one required line of configuration, which looks like following.

```html
<!-- { "path" : "client/views/__templateVar__.html" } -->
<template name="__templateVar__">
    <h1>This is the content</h1>
<template>
```

You can use the variables in the template, as long as the json configuration for the path is on the first line it'll recognize it.

### Generating files

You can create components, routes, models and more in the default configuration or change it and add more templates.

```bash
orion generate component
orion generate routes
```

### Change profiles

The default profile in the configuration is __ES2015__, which generates other kind of files. You can also define your own profiles.

