# FAQ


> ### What is an add-on?

An add-on, is an external script, which will add new features to wako.
There are two types of add-ons:

- Officials, made by the wako team.
- The unofficial ones, made by the communities.

**Be careful when installing third party add-ons, wako is not responsible for what these add-ons do.**

> ### What the add-on can do?

An add-on can have 4 different actions:

- movies
- episodes
- episodes-item-option
- shows

These actions are defined in the [plugin's manifest](https://github.com/wako-app/addon-starter-kit/blob/master/projects/plugin/src/manifest.json#L8).

When a user browses a movie detail page for example, wako will load all the add-ons with action `movies` and
will call them with the current [Movie](https://github.com/wako-app/mobile-sdk/blob/master/src/entities/movie.ts) object.
It does the same for the other 3 actions. Then you have all the metadata of the current page and can do whatever you want.
For example here, when a user is on the TV Shows detail page, we will display a button to play the trailer of the TV show on Kodi.
  
In addition you can manage a page for the settings of your add-on and a page for its details (if you want to add more features).

As wako is made in JavaScript, it is quite possible to modify the content of the pages and their appearance.
