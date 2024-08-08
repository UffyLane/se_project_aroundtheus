# Project 3: Around The U.S.

### Overview

- Intro
- Semantic HTML5(Project description)
- Images
- Plans for improving
- Video Link

**Intro**

This project is made so all the elements are displayed correctly on popular screen sizes. Figma was used to get measurements and pictures. In the README. I will be explaining about semantic codes used to make this project happen along with images to explain whats successful about it and what is a problem as well. Will attempt to explain how to fix and improve project. MOst likely though if its wrong I really don't know but plan to figure it out!

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

**Semantics HTML5**

In this project I used:

<meta charset="UTF-8" />
      <meta content="width=device-width, intial-scale=1.0" name="viewport" />
      <meta content="ie=edge" http-equiv="X-UA-Compatible" />

      These meta codes help give the page proper scale, width, and viewport to make the website compatible with different browers the project will be displayed on.

`<header>` `<body>` `<footer>`

The <header> I nesseled into the <head> of the project but im sure its supposed to be in the <body> but I will be explaining that in the video in full detail.

The <body> of the project has all of the <section> tags with the images used in the project.

In the <profile> section of the project i used display **flex** and **align-items** to **center** the items accordingly.

**profile\_\_info** This section is using what we used in the most recent sprint called display **grid** with the **grid-template-areas** putting the descriptions and items in the proper place ![profile](./images/demo/Screen%20Shot%202024-08-07%20at%205.52.29%20PM.png)

when I use the `@media` for the mobile screen resolution **profile\_\_info** it uses the css code display **flex** and **flex-wrap** to line up the intems in the section as so: ![profile2](./images/demo/Screen%20Shot%202024-08-07%20at%206.01.26%20PM.png)

**card** All cards have images from Figma and the fonts used in the description and all of the project is `Inter`. There are 3 different variations of `Inter`. `woff2` `regular` `medium` `black`.

The **profile** and **card** sections have <buttons> for the edit, add, and like sections of the web-page. They have transent backgrounds with `no-repeat` in the image used. Every button has a `hover` code.

In the **card** section the text overflow is `hidden` . It uses display `flex` in the desktop browswer view. When i use the `@media` in the **card\_\_list** it changes from `grid` to `flex` as the resolution changes.

Every <section> has their own `.css` in the `blocks`

header.css
profile.css
page.css
card.css
cards.css
footer.css

the `fonts.css` is in the <vendor> folder of the project.

the `index.css` has all the `@import` for each block.

**footer** very simple. Just has the <footer\_\_copyright> and `&copy` for the `@` sigel.

**Images**

![desktop](./images/demo/Screen%20Shot%202024-08-07%20at%204.51.33%20PM.png)

![mobile1](./images/demo/Screen%20Shot%202024-08-07%20at%204.58.23%20PM.png)

![mobile2](./images/demo/Screen%20Shot%202024-08-07%20at%204.58.49%20PM.png)

![mobile3](./images/demo/Screen%20Shot%202024-08-07%20at%204.59.04%20PM.png)

![tablet1](./images/demo/Screen%20Shot%202024-08-07%20at%208.11.54%20PM.png)

![tablet2](./images/demo/Screen%20Shot%202024-08-07%20at%208.12.04%20PM.png)

**Plans for Improvement**

I feel that the header may be in the wrong semantic. ![header](./images/demo/Screen%20Shot%202024-08-07%20at%208.20.18%20PM.png)

Also as you can see the class <header class="header page__section"> in the header. That `<page__section>` tag is holding the whole project together. When I take it off of the header it removes it. I tried a couple of different things but havent seen it look better than this version of the project. May need help figuring out what it is I did wrong.

I also noticed one of my <like\_\_button> tags in the card has a spacing issue. it seems it cuts off a piece of the picture ![like_button](./images/demo/Screen%20Shot%202024-08-07%20at%208.30.14%20PM.png)
Not sure, I think its a spacing problem within the `padding` or `margin` or the `white spacing` in the text hidden feature. Trying to figure it out may need help.

**Video-Link**

https://drive.google.com/file/d/1Tyeg7UeQiAxeAYZVnPlK9FTrsYJzwXb2/view?usp=drive_link
