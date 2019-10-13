# vim

a game of squares

(not to be confused with the [text editor](https://www.vim.org/))

### what is vim?
on October 9, [@eigenbom](https://twitter.com/eigenbom/) posted a [tweet](https://twitter.com/eigenbom/status/1182059055382052864) challenging users to design and fit the rules of a short tabletop RPG into a single tweet. [vim was my response.](https://twitter.com/sporeball/status/1182079746785439745)

tabletop RPGs are all well and good, but i wanted to create a version of vim that did without all that graph paper &mdash; and this is it.

### why is commit [`9360d3e`](https://github.com/sporeball/vim/commit/9360d3e1dda9f0380c7a50a17cd82a7492b1d42c) labeled "code migration"?

<details>
<summary>click to read</summary>
<br/>

at the beginning of its development cycle, i hosted vim using the fantastic [JSFiddle](https://jsfiddle.net/), and i never really planned on changing that. however, after running into some issues about 50 revisions in, i decided that moving the project to GitHub would be a better choice.

[`9360d3e`](https://github.com/sporeball/vim/commit/9360d3e1dda9f0380c7a50a17cd82a7492b1d42c) is a near-identical copy of the fiddle's final revision, except with all audio removed and a couple of other minor changes made. in the interest of transparency, i've left the original fiddle [here](https://jsfiddle.net/sporeball/dyaq1p9k/).

if you're curious, here is a rough outline of the original fiddle's history:
* [revision 1](https://jsfiddle.net/sporeball/dyaq1p9k/1): vim begins with a blank canvas.
* [revision 4](https://jsfiddle.net/sporeball/dyaq1p9k/4): player tags and a grid are added.
* [revision 12](https://jsfiddle.net/sporeball/dyaq1p9k/12): the menu is completed, and player count selectable.
* [revision 15](https://jsfiddle.net/sporeball/dyaq1p9k/15): handmade functions for drawing are experimented with for the first time.
* [revision 20](https://jsfiddle.net/sporeball/dyaq1p9k/20): selecting player count now draws the correct number of players into the center of the grid.
* [revision 34](https://jsfiddle.net/sporeball/dyaq1p9k/34): after much revision, the logic behind the die is pretty much completed.
* [revision 37](https://jsfiddle.net/sporeball/dyaq1p9k/37): rolling the die cycles through each player in succession.
* [revision 44](https://jsfiddle.net/sporeball/dyaq1p9k/44): sounds are added for the first time, with the help of [Howler.js](https://github.com/goldfire/howler.js).
* [revision 46](https://jsfiddle.net/sporeball/dyaq1p9k/46): sounds to go along with the revamped menu are added.

issues with getting the sounds added in revision 46 to reliably play on load &mdash; even after getting rid of Howler.js &mdash; led me to create this repository and perform the "code migration". 
</details>

### donate
you can support the development of this project and others via Patreon:

<a href="https://patreon.com/sporeball"><img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fsporeball%2Fpledgesssss&style=for-the-badge" /></a>