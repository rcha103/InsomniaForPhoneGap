# Insomnia for PhoneGap

A Mendix widget to enable PhoneGap application to stay awake (prevent sleep).

### Description

InsomniaForPhoneGap is a widget which enables your Mendix mobile hybrid application (Android and iOS) to prevent the device from sleeping.

### Credits

InsomniaForPhoneGap is an based from several other projects. Credit to the following:
  - [Mendix](https://github.com/mendix) for their work on [GeolocationForPhoneGap](https://github.com/mendix/GeolocationForPhoneGap). The widget used in this module is based on their widget implementation, since I did not use the boilerplate to create the widget.
  - [Eddy Verbruggen](https://github.com/EddyVerbruggen) for his work on [Insomnia-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin). The widget used in this module uses his plugin.

### Requirements
- Mendix 7.12.0 or later
- A project with a hybrid app

### Installation and configuration

1. Download the widget to your project
2. Place the widget to a data view with a Boolean attribute (required)
3. (Optional) Specify your on change microflow and/or nanoflow
4. On your phonegap **config.xml** file, add the following line:
    ```sh
    <plugin name="cordova-plugin-insomnia" source="npm" spec="4.3.0" />
    ```
    
### Features
- Supports microflows and nanoflows
- Supports offline hybrid app
- Supports both iOS, Android, and Windows Phone

### Known bugs
It was reported that on iOS the app would fall asleep after the Camera has been used, even if you previously called `keepAwake`. A similar issue on Android where the photo library was accessed during app usage.

So to make sure your app honors `keepAwake`, you have to re-run that method after these kinds of 'external UI' thingies give control back to your app.

More info [here](https://github.com/EddyVerbruggen/Insomnia-PhoneGap-Plugin#quirks).

### FAQ
- You can raise an issue on GitHub, I might be able to answer it if I have the time. Asking on Mendix forum probably won't get you the answer since I don't spend much time there.
- For questions specific to the PhoneGap plugin, you may ask directly to the [maintainer](https://github.com/EddyVerbruggen).
