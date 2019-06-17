# Knife Templating Engine (JS)

Blade, but smaller...

I had to develop a small template engine, so here it is. I like blade, so the syntax is pretty similar. This is built to be extensive so you can do pretty much anything you like...

## Basic Understanding

This works by simply replacing a template string by a *function*, which, given a context, returns the rendered html.

The engine is written in *typescript* so you get all the nice definitions

## Usage

This package is sup^posed to be working on both NodeJS and in browsers.

Just...
```shell
npm install knifejs
```
... and budle it or use it or just...
```html
<script src="./dist/knife.js"></script>
<script>const { KnifeEngine } = knife;</script>
```

### Interpolation

You can eaily interpolate any constant, variable, function result or basically any expression that returns something :

```html
<h1>{{ hasTitle ? title : 'Hello' }}</h1>
```


### Directives

A few basic directives are already built in and I plan to maybe add more :

#### Foreach
PHP inspired foreach loop
```html
@foreach(lines as line)
   {{ line }}
@endforeach
```

#### For
Basic for loop
```html
@for(let i; i < 0; i++)
   {{ i }}
@endfor
```

#### Conditionnals
Simple boolean operations
```html
@if (wow == true)
    Wow !!
@elseif (super == true)
    Super !!
@else
    Oh no :(
@endif
```

## License

© WTFPL 2019

Just ask me if you plan to use this commercially.

Thanks.