var game;
var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

window.onload = function() {
  var config = {
    type: Phaser.CANVAS,
    width: gameWidth,
    height: gameHeight,
    scene: [intro]
  };
  game = new Phaser.Game(config);
  resize();
  window.addEventListener("resize", resize, false);
};

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}

var intro = new Phaser.Scene('intro');

intro.preload = function()
{
	this.load.image("background", "/assets/images/clear-sky.png" );
	this.load.image("cloud", "/assets/images/cloud.png" );
	this.load.image("cloud2", "/assets/images/cloud2.png" );
	this.load.image("hommonboard", "/assets/images/hommonboard.png" );
	this.load.image("githublogo", "/assets/images/githublogo_min.png" );
	this.load.bitmapFont("font", "/assets/fonts/font_empty.png", "/assets/fonts/font_empty.fnt");
}

intro.create = function() {
    this.background = this.add.tileSprite(
  		0, 0,
  		this.game.config.width, this.game.config.height,
  		"background"
  	);
  	this.background.setOrigin(0, 0);
  	this.cloud = this.add.image(
        this.game.config.width + 400, this.game.config.height / 4,
        "cloud"
    );
    this.cloud2 = this.add.image(
        this.game.config.width / 2, this.game.config.height / 2,
        "cloud2"
    );
    this.hommonboard = this.add.image(
        this.game.config.width / 2, this.game.config.height / 3,
        "hommonboard"
    );

    this.githublogo = this.add.image(
         this.game.config.width / 3, this.game.config.height - 30,
         "githublogo"
     );
     this.githublogo.setScale(0.5);

    this.txtGithub = this.add.bitmapText(
        this.game.config.width / 2,
        this.game.config.height - 43,
        "font",
        "Project on Github",
        23
    );
    this.txtGithub.x = this.game.config.width / 2 - this.txtGithub.width / 2 + this.githublogo.width / 3;
    this.githublogo.x = this.txtGithub.x - this.githublogo.width / 2;

    this.txtGithub.setInteractive();

    this.input.on("gameobjectdown", function (event) {
         window.open("https://github.com/hommonboard/hommonboard","_blank")
    }, this);

    this.input.on("gameobjectover", function (event) {
        this.txtGithub.setScale(1.05);
    }, this);

    this.input.on("gameobjectout", function (event) {
        this.txtGithub.setScale(1);
    }, this);
};

intro.update = function() {
    this.background.tilePositionX += 0.1;

    this.cloud.x -= 0.2;
    if (this.cloud.x < -this.cloud.width) {
        this.cloud.x = this.game.config.width + this.cloud.width;
    }

    this.cloud2.x -= 0.25;
    if (this.cloud2.x < -this.cloud.width) {
        this.cloud2.x = this.game.config.width + this.cloud2.width;
    }
}