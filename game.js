// Phaser 3 Updated Code for "Crush the Rush - Barista Defense"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/cafe_background.png');
    this.load.image('barista', 'assets/barista.png');
    this.load.image('customer', 'assets/customer.png');
}

function create() {
    let bg = this.add.image(400, 300, 'background');
    bg.setScale(800 / bg.width, 600 / bg.height);
    
    this.barista = this.add.sprite(100, 500, 'barista').setScale(0.5);
    this.customer = this.add.sprite(700, 500, 'customer').setScale(0.5);
    
    // Create a group to hold customers
    this.customers = this.physics.add.group();

    // Every 3 seconds, a new customer will appear
    this.time.addEvent({
        delay: 3000,
        callback: spawnCustomer,
        callbackScope: this,
        loop: true
    });
}

function spawnCustomer() {
    let customer = this.customers.create(800, 500, 'customer');
    customer.setVelocityX(-100); // Moves toward barista
}

function update() {
    // Check if a customer reaches the barista
    this.customers.children.iterate((customer) => {
        if (customer && customer.x <= 150) {
            customer.destroy(); // Remove customer (later we’ll add a fail condition)
        }
    });
}
