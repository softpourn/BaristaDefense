// filepath: /Users/danielmclaughlin/Documents/BaristaDefense/const config = {.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('espressoMachine', 'assets/espressoMachine.png');
    this.load.image('coffeeBlaster', 'assets/coffeeBlaster.png');
    this.load.image('customer', 'assets/customer.gif');
}

function create() {
    this.espressoMachine = this.physics.add.sprite(100, 300, 'espressoMachine');
    this.coffeeBlasters = this.physics.add.group();
    this.customers = this.physics.add.group();

    this.time.addEvent({
        delay: 1000,
        callback: generateCoffeeBlaster,
        callbackScope: this,
        loop: true
    });

    this.time.addEvent({
        delay: 2000,
        callback: generateCustomer,
        callbackScope: this,
        loop: true
    });
}

function update() {
    this.physics.overlap(this.coffeeBlasters, this.customers, hitCustomer, null, this);
}

function generateCoffeeBlaster() {
    const coffeeBlaster = this.coffeeBlasters.create(this.espressoMachine.x, this.espressoMachine.y, 'coffeeBlaster');
    coffeeBlaster.setVelocityX(200);
    coffeeBlaster.damage = Phaser.Math.Between(10, 30); // Random damage between 10 and 30
}

function generateCustomer() {
    const customer = this.customers.create(800, Phaser.Math.Between(50, 550), 'customer');
    customer.setVelocityX(-100);
    customer.health = 100; // Initial health for each customer
}

function hitCustomer(coffeeBlaster, customer) {
    customer.health -= coffeeBlaster.damage;
    coffeeBlaster.destroy();

    if (customer.health <= 0) {
        customer.destroy();
    }
}