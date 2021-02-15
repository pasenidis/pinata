# Bundler (no name yet)

Bundler is a tool for dealing with JS bundling.

## How it works

### What is Bundling?
Bundling is a technique used by developers to reduce the number of HTTP requests for JS files to the minimum. Essentially, in the front end world, to bundle something is to put your whole project into a big, sometimes obfuscated or minified, JS file.

### Ok, but how?
Well, here are the steps my bundler takes:
- Parse the entry file and generate an **AST**;
- Create a **dependency graph**;
- Create an **AST** for every dependency;
- **Transpile** everything with Babel;

## Parsing the entry file
To find the dependencies inside a file, we need to parse it. We can do this using AST (or simply syntax trees) parsers.

Now that we know what our dependencies, we store them into a list for later.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1574.5 374.5" width="1574.5" height="374.5">
  <!-- svg-source:excalidraw -->
  
  <defs>
    <style>
      @font-face {
        font-family: "Virgil";
        src: url("https://excalidraw.com/FG_Virgil.woff2");
      }
      @font-face {
        font-family: "Cascadia";
        src: url("https://excalidraw.com/Cascadia.woff2");
      }
    </style>
  </defs>
  <rect x="0" y="0" width="1574.5" height="374.5" fill="#ffffff"></rect><g transform="translate(10 10) rotate(0 302.5 175.5)"><path d="M0.738402196764946 -1.387559959292412 C224.21986335907133 2.999914868399501, 447.45759588368236 2.2607660608738662, 605.1521910876036 -0.7840102881193162 M0.17096549421548846 -0.12462872415781022 C235.97349533196538 -1.4831760480254887, 471.85660530887543 -0.2800651147216555, 605.1711885109544 -0.5593877211213112 M603.9438833389502 1.4980624633242547 C605.3698677833291 81.08682267608631, 606.4394475958534 159.95073595397898, 605.2421064700775 352.9929243119973 M605.9109017124258 0.7055077081494361 C602.5001343351386 102.24386001193353, 602.2085646512595 206.29505475644336, 604.445437784324 350.8023495049204 M603.9306390970945 351.07985585033896 C449.8739046951756 355.3268915063888, 297.1990275930613 354.95758522816004, 0.3113652437925339 350.51168310940267 M605.5700023785233 350.38481370061635 C436.8733139986172 347.5235654874891, 268.2834752891212 347.8375071092695, -0.7028428420424462 350.47317176908257 M1.3832607194696485 348.7965895194076 C2.502813186996667 252.56115550594777, 2.44735711781923 151.97863313691548, -1.0481558570079743 1.988011968068403 M-1.0348036508838205 351.8183025870933 C1.834924813858697 229.25621444668408, 4.023432536553189 106.05210821047716, 0.4981843719848126 -1.0041511211101501" stroke="#000000" stroke-width="2" fill="none"></path></g><g transform="translate(48 49.5) rotate(0 269 152)"><text x="0" y="31" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">import { func } from './lib';</text><text x="0" y="69" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr"></text><text x="0" y="107" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">...</text><text x="0" y="145" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">...</text><text x="0" y="183" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">...</text><text x="0" y="221" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr"></text><text x="0" y="259" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">func();</text><text x="0" y="297" font-family="Cascadia, Segoe UI Emoji" font-size="31.66666666666668px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr"></text></g><g><g transform="translate(627.0000000000002 173.48071739744012) rotate(0 160.00071918778133 -2.690194557684208)"><path d="M-0.7147099025547505 1.8382937796413898 C52.6316070664674 1.0360027998429056, 267.36454591887696 -5.8141297997328065, 320.7161482781172 -7.218682895009806 M4.092780508249998 0.36791373565793073 C56.888801812802754 0.03026982006843082, 264.31100636141997 -4.1821078051420475, 317.761045152545 -5.001657390897563" stroke="#000000" stroke-width="2" fill="none"></path></g><g transform="translate(627.0000000000002 173.48071739744012) rotate(0 160.00071918778133 -2.690194557684208)"><path d="M292.3847299610797 3.875212988375038 C295.2659422891762 -1.3438713475345496, 305.2044909050463 -0.49514814317649947, 315.53712986618285 -3.6164453792622595 M289.58836491979395 4.5383050837799015 C299.5596924112767 0.6176331657829643, 309.3441748799183 -1.2853970135762767, 318.39886674121027 -4.715750930761388" stroke="#000000" stroke-width="2" fill="none"></path></g><g transform="translate(627.0000000000002 173.48071739744012) rotate(0 160.00071918778133 -2.690194557684208)"><path d="M292.0171182497904 -16.642702695620812 C294.6645343730605 -15.236839673484928, 304.721746033562 -7.765045794869646, 315.53712986618285 -3.6164453792622595 M289.2207532085047 -15.97961060021595 C299.50737378280024 -12.935256059910376, 309.41655945963055 -7.878089290789163, 318.39886674121027 -4.715750930761388" stroke="#000000" stroke-width="2" fill="none"></path></g></g><g transform="translate(959.5 13.5) rotate(0 302.5 175.5)"><path d="M0.8895650178194047 -0.6070248395204545 C143.09276746418328 0.17926961012184606, 283.4718762826175 -1.4285496609658006, 605.4502496987582 -0.39679124653339387 M-0.5587005510926247 0.5656982079148293 C124.01143456045538 -0.22524378873407824, 249.06341629065574 -0.5178467569500207, 604.239056931436 -0.2828626498579979 M602.5887643873183 -1.8635205574195801 C606.8338447230665 120.03791873359245, 604.1370107202438 242.50696049336057, 606.6522229196705 350.5680626183672 M606.2172562607307 0.01830252925543487 C601.7954188090549 89.11963203511127, 602.0166397463107 179.0528679590793, 604.1124826567753 351.0616499998688 M606.484239128232 351.906958886981 C472.06538031790404 352.52679367832843, 337.9937169421464 350.6662217216939, -0.38109547793865206 351.9401844233274 M604.3084994420409 350.7765667572618 C376.7795300519094 347.76604292310776, 148.13270024918015 348.07672059454023, 0.003397427499294281 351.79722281843425 M-2.312389954279047 349.12146419611014 C2.078294798529744 265.7973829869909, 1.3372729256509066 180.59051791108092, -2.2374863695952474 -1.057026732192415 M0.5534735848038703 350.51132566762425 C-0.1473876652531636 259.34303432517265, -0.9742669758794796 166.2433568654817, 0.9617180059522658 0.5400477218252628" stroke="#000000" stroke-width="2" fill="none"></path></g><g transform="translate(1063.5330891884887 15.032925916687645) rotate(0 217.5565476190476 173.2203791469193)"><text x="0" y="19.7457684495599" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">{</text><text x="0" y="44.4915368991198" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">        "type": "ImportDeclaration",</text><text x="0" y="69.2373053486797" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">        "start": 0,</text><text x="0" y="93.9830737982396" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">        "end": 29,</text><text x="0" y="118.7288422477995" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">        "loc": {</text><text x="0" y="143.4746106973594" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">          "start": {</text><text x="0" y="168.2203791469193" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">            "line": 1,</text><text x="0" y="192.9661475964792" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">            "column": 0</text><text x="0" y="217.7119160460391" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">          },</text><text x="0" y="242.457684495599" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">          "end": {</text><text x="0" y="267.2034529451589" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">            "line": 1,</text><text x="0" y="291.9492213947188" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">            "column": 29</text><text x="0" y="316.6949898442787" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">          }</text><text x="0" y="341.4407582938386" font-family="Cascadia, Segoe UI Emoji" font-size="20.621473707966594px" fill="#000000" text-anchor="start" style="white-space: pre;" direction="ltr">}</text></g></svg>

## Installation

Coming soon.

<!-- ```bash
run do something
``` -->

## Usage

Coming soon.

<!-- ```

``` -->

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.