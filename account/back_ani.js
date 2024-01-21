/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('back_ani');
const ctx = canvas.getContext('2d');
const width = canvas.width = 530;
const height = canvas.height = 530;

// ctx.fillStyle = 'blue';
// ctx.beginPath();
// ctx.arc(0, 0, 150, 0, 2 * Math.PI);
// ctx.fill();

class Bubble
{
    constructor(colors)
    {
        this.radius = Math.random() * 25 + 25;
        this.lr = Math.floor(Math.random() * 2);
        if(this.lr == 0)
        {
           this.x = -this.radius;
           this.x_spd = Math.random() * 2;
        }
        else{
            this.x = width + this.radius;
            this.x_spd = Math.random() * -2;
        }
        this.y = Math.random() * height;
        this.ind = Math.floor(Math.random() * colors.length);
        this.clr = colors[this.ind];
        this.y_spd = Math.random() * 2 - 1;
        this.remove = false;
    }

    update()
    {
        this.x += this.x_spd;
        this.y += this.y_spd;
        
        if(this.x + this.radius < -100 ||
           this.x - this.radius > width + 100 ||
           this.y + this.radius > height + 100 ||
           this.y - this.radius < -100)
        {
            this.remove = true;
        }
    }

    draw()
    {
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
};

let last_time = 0;
const colors = ['#6ae6f7', '#86f99f', '#f5d1f4', '#f9bb86', '#f98d86'];
let bubbles = [];
let num_bub = 15;
let global_spd = 15;
let time_since_last_frame = 0;

for(let i = 0; i < num_bub; ++i){
    bubbles.push(new Bubble(colors));
}

function animate(time_stamp)
{
    ctx.clearRect(0, 0, width, height);

    if(bubbles.length < num_bub)
    {
        bubbles.push(new Bubble(colors));
    }

    bubbles.forEach((bubble) => {
        bubble.draw();
    });

    for(let i = bubbles.length - 1; i > -1; --i)
    {
        if(bubbles[i].remove) bubbles.splice(i, 1);
    }

    let delta_time = time_stamp - last_time;
    last_time = time_stamp;
    time_since_last_frame += delta_time;

    if(time_since_last_frame > global_spd)
    {
        time_since_last_frame = 0;
        bubbles.forEach((bubble) => {
            bubble.update();
        });
    }

    let frame = requestAnimationFrame(animate);
}

animate(0);
