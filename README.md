# mh-config-tester

Rough tool for inspecting style variables across all sites including QA and PROD configs 

Basic features:
- diff of QA and PROD styling configs
- show and search thru all used styling variables
- show which variable is used on which site (and its value)
- show if variable is using defualt
- show if variable has its default value defined in _settings.scss
- show SCSS variable default value
- list all sites (QA/PROD switch)

### 1) Install

```
npm install
bower install
```

### 2) Grab data
Connect to the both QA and PROD VPN first. 

That is workaround. 
Our config urls are using crossdomain policy, so configs data are grabbed by pipeline for now.


```
gulp grab
```

### 3) Run server
```
gulp server
```

ponint your browser to the localhost:8080


#### Notes
- Of course possible improvements (a lot)
- Just quick tool made in free time
- Very rough
- Not optimized, cleaned. Etc. 
- No err handling
- _settings.scss is not parsed automatically. Json file made manually.
