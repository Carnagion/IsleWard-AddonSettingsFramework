# Addon Settings Framework

IsleWard - Addon Settings Framework provides a set of functions and events that enable addon developers to add settings for their addons with little to no effort.

## Features

- #### Custom settings
  Custom settings can be added with just a single line of code. Quite literally.  
  Each setting has its own event that can be easily hooked up with callback functions to know when a setting's value has been changed.  
  Supported setting types include:
  - Headings
  - Toggles
  - Switches
  - Sliders

- #### Persistence
  Custom settings' values are saved to the local storage when changed, and persist across multiple sessions and playthroughs.
  

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