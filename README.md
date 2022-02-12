# Addon Settings Framework

IsleWard - Addon Settings Framework provides a set of functions and events that enable addon developers to add settings for their addons with little to no effort.

## Features

- #### Headings
  Headings are used to categorise settings.

- #### Toggles
  Toggles are settings with a fixed set of values that are cycled through when clicked on.

- #### Switches
  Switches are a special case of toggles with only two possible values - on and off.

- #### Sliders
  Sliders are settings with a range of numerical values from a minimum to a maximum.

Detailed explanations on each feature as well as installing/using the framework can be found on the [Addon Settings Framework wiki](https://github.com/Carnagion/IsleWard-AddonSettingsFramework/wiki).

## Installation

The installation procedure is different, depending on whether one is playing using a browser, or on the [IsleWard client](https://gitlab.com/Isleward/desktop-client).

- #### Client
  Refer to [this link](https://gitlab.com/Isleward/desktop-client#how-do-i-load-addons).
- #### Browser
  Install [ViolentMonkey](https://violentmonkey.github.io/get-it/). Then, install the `settings.js` file as a script in ViolentMonkey.

## FAQs

- #### Does this add anything by itself?
  No. This addon is a framework meant to be used by other addons. By itself, it does nothing and can be removed if it is not needed by other addons.

- #### Will this affect other players?
  No, this is an entirely client-side addon. Only the user will be able to see the changes made.

- #### What about performance and memory usage?
  The addon is quite lightweight will barely have any impact on performance or memory usage.