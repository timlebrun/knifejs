import { KnifeEngine } from "../src/knife";

const template = `
<div>
<h2>{{ title }}</div>
<ul>
    @foreach(lines as line)
        <li>{{ line }}</li>
    @endforeach
</ul>
`;

const context = {
    title: 'Hello !!',
    lines: ['Ligne 1', 'Ligne 2']
};

console.info('Starting tests for Knife JS Templating Engine !');

console.info('Creating instance...');
const knife = new KnifeEngine();

console.info('Rendering template string...');
const rendered = knife.renderString(template, context);

console.log('RESULT', rendered);

console.info('Works for me ! Bye !');
