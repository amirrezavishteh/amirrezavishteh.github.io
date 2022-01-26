---
layout: single
author_profile: true
permalink: /friends/
title: My Pets
tags: [Pets]
modified: 4-10-2019
comments: true
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  --line-offset: calc((10vh + 8px) / 2);
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 5fr 1fr;
  background: #021919;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  display: flex;
}

.tab {
  width: calc(10vh + 8px);
  height: calc(10vh + 8px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  shape-outside: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  z-index: 0;
  transition: width 0.5s;
}

.tab img {
  width: 10vh;
  height: 10vh;
  z-index: 10;
  cursor: pointer;
  clip-path: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  shape-outside: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  transition: width 0.5s;
}

[type="radio"] {
  display: none;
}

.preview-list {
  background: linear-gradient(
    #021919,
    #021919 var(--line-offset),
    #efefef var(--line-offset)
  );
}

.tab {
  background: linear-gradient(
    #efefef,
    #efefef var(--line-offset),
    #021919 var(--line-offset)
  );
}

[type="radio"]:checked ~ label ~ .content {
  text-align: center;
  z-index: 8;
}

[type="radio"]:checked ~ label .tab {
  width: 0;
}

.content {
  position: absolute;
  background: #021919;
  top: 1vh;
  left: 0;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.content img {
  height: auto;
  width: 100vw;
}

---
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  --line-offset: calc((10vh + 8px) / 2);
}

.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 5fr 1fr;
  background: #021919;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
  display: flex;
}

.tab {
  width: calc(10vh + 8px);
  height: calc(10vh + 8px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  shape-outside: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  z-index: 0;
  transition: width 0.5s;
}

.tab img {
  width: 10vh;
  height: 10vh;
  z-index: 10;
  cursor: pointer;
  clip-path: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  shape-outside: polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%);
  transition: width 0.5s;
}

[type="radio"] {
  display: none;
}

.preview-list {
  background: linear-gradient(
    #021919,
    #021919 var(--line-offset),
    #efefef var(--line-offset)
  );
}

.tab {
  background: linear-gradient(
    #efefef,
    #efefef var(--line-offset),
    #021919 var(--line-offset)
  );
}

[type="radio"]:checked ~ label ~ .content {
  text-align: center;
  z-index: 8;
}

[type="radio"]:checked ~ label .tab {
  width: 0;
}

.content {
  position: absolute;
  background: #021919;
  top: 1vh;
  left: 0;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.content img {
  height: auto;
  width: 100vw;
}

### My dogs


<!-- ![alt text]({{amirrezavishteh.github.io}}/assets/images/mdog1.jpg "hobbies")
![alt text]({{amirrezavishteh.github.io}}/assets/images/dog1.jpg "hobbies")
![alt text]({{amirrezavishteh.github.io}}/assets/images/dg.jpg "hobbies")
![alt text]({{amirrezavishteh.github.io}}/assets/images/dg2.jpg "hobbies") -->

<!-- <!DOCTYPE html> -->
<!-- <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,400i|Nunito:300,300i" rel="stylesheet">
        <link rel="stylesheet" href="css/style.css">
        <link rel="shortcut icon" type="image/png" href="img/favicon.png">
        <title>CSS Grids Gallery</title>
    </head>
    <body>
        <div class="container">
            <div class="gallery">
                <figure class="gallery__item gallery__item--1">
                    <img src="{{amirrezavishteh.github.io}}/assets/images/mdog1.jpg" alt="Gallery image 1" class="gallery__img">
                </figure>
                <figure class="gallery__item gallery__item--2">
                    <img src="{{amirrezavishteh.github.io}}/assets/images/dog1.jpg" alt="Gallery image 2" class="gallery__img">
                </figure>
                <figure class="gallery__item gallery__item--3">
                    <img src="{{amirrezavishteh.github.io}}/assets/images/dg.jpg" alt="Gallery image 3" class="gallery__img">
                </figure>
                <figure class="gallery__item gallery__item--4">
                    <img src="{{amirrezavishteh.github.io}}/assets/images/dg2.jpg" alt="Gallery image 4" class="gallery__img">
                </figure>
            </div>
        </div>
    </body>
</html> -->
<!-- <html>
<head>
<style>
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}
div.gallery:hover {
  border: 1px solid #777;
}
div.gallery img {
  width: 100%;
  height: auto;
}
div.desc {
  padding: 15px;
  text-align: center;
}
</style>
</head>
<body>
<div class="gallery">
  <a target="_blank" href="img_5terre.jpg">
    <img src="{{amirrezavishteh.github.io}}/assets/images/mdog1.jpg" alt="Cinque Terre" width="600" height="400">
  </a>
  <div class="desc">Barack</div>
</div>
<div class="gallery">
  <a target="_blank" href="img_forest.jpg">
    <img src="{{amirrezavishteh.github.io}}/assets/images/dog1.jpg" alt="Forest" width="600" height="400">
  </a>
  <div class="desc">Barack</div>
</div>
<div class="gallery">
  <a target="_blank" href="img_lights.jpg">
    <img src="{{amirrezavishteh.github.io}}/assets/images/dg2.jpg" alt="Northern Lights" width="600" height="400">
  </a>
  <div class="desc">Jordan</div>
</div>
<div class="gallery">
  <a target="_blank" href="img_mountains.jpg">
    <img src="{{amirrezavishteh.github.io}}/assets/images/dg.jpg" alt="Mountains" width="600" height="400">
  </a>
  <div class="desc">Jordan</div>
</div>
</body>
</html> -->
<div class="container">
        <div class="full-view"></div>
        <div class="preview-list">
            <ul>
                <li>
                    <input type="radio" id="tab-1" name="gallery-group">
                    <label for="tab-1">
                        <div class="tab">
                            <img
                                src="{{amirrezavishteh.github.io}}/assets/images/mdog1.jpg"/>
                        </div>
                    </label>
                    <div class="content">
                        <img
                            src="{{amirrezavishteh.github.io}}/assets/images/dog1.jpg"/>
                    </div>
                </li>
                <li>
                    <input type="radio" id="tab-2" name="gallery-group">
                    <label for="tab-2">
                        <div class="tab">
                            <img
                                src="{{amirrezavishteh.github.io}}/assets/images/dg2.jpg" />
                        </div>
                    </label>
                    <div class="content">
                        <img
                            src="{{amirrezavishteh.github.io}}/assets/images/dg.jpg" />
                    </div>
                </li>
                <li>
                    <input type="radio" id="tab-3" name="gallery-group">
                    <label for="tab-3">
                        <div class="tab">
                            <img
                                src="https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                    </label>
                    <div class="content">
                        <img
                            src="https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    </div>
                </li>
                <li>
                    <input type="radio" id="tab-4" name="gallery-group" checked>
                    <label for="tab-4">
                        <div class="tab">
                            <img
                                src="https://images.pexels.com/photos/22427/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                    </label>
                    <div class="content">
                        <img src="https://images.pexels.com/photos/22427/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    </div>
                </li>
                <li>
                    <input type="radio" id="tab-5" name="gallery-group">
                    <label for="tab-5">
                        <div class="tab">
                            <img
                                src="https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                    </label>
                    <div class="content">
                            <img src="https://images.pexels.com/photos/789380/pexels-photo-789380.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                </li>
                <li>
                    <input type="radio" id="tab-6" name="gallery-group">
                    <label for="tab-6">
                        <div class="tab">
                            <img
                                src="https://images.pexels.com/photos/355411/pexels-photo-355411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        </div>
                    </label>
                    <div class="content">
                            <img src="https://images.pexels.com/photos/355411/pexels-photo-355411.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        </div>
                </li>
                <li>
                    <input type="radio" id="tab-7" name="gallery-group">
                    <label for="tab-7">
                        <div class="tab">
                            <img
                                src="https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                    </label>
                    <div class="content">
                            <img src="https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                        </div>
                </li>
            </ul>
        </div>
    </div>