let res = 10; //for the position of points where the intensity would be read
let grid_X; // array of net Xcomponents of electric field at a defined point
let grid_Y; // array of net  Ycomponents of electric field at a defined point

function setup() {
    createCanvas(1200, 600);

    grid_X = new Array(width / res);
    grid_Y = new Array(width / res);
    for (let i = 0; i < width / res; i++) {
        grid_X[i] = new Array(height / res);
        grid_Y[i] = new Array(height / res);
    }
    c1 = new Charge(800, 200, 30);
    c2 = new Charge(900, 200, -20);
    c3 = new Charge(500, 200, 20);
    vectorGrid();
}

function draw() {
    background(0);
    c1.display();
    c2.display();
    c3.display();
    drawFieldLines();
}

class Charge {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;

    }



    display() {
        if (this.value > 0) {
            fill(255, 204, 0);
        } else if (this.value < 0) {
            fill(255, 140, 0);
        }
        stroke(0);
        strokeWeight(1);
        ellipse(this.x, this.y, 15, 15);
    }

}

function vectorGrid() {

    for (let i = 0; i < width / res; i++) {
        for (let j = 0; j < height / res; j++) {

            //setting up points where electric field would be calculated
            x = res / 2 + i * res
            y = res / 2 + j * res
            //res/2 because we want the points to be placed equally
            dx = x - c1.x;
            dy = y - c1.y;
            d1 = sqrt(dx * dx + dy * dy);
            E1 = c1.value / (d1 * d1);
            //electric field components due to charge 1 
            E1x = dx * E1 / d1;
            E1y = dy * E1 / d1;

            dxn = x - c2.x;
            dyn = y - c2.y;
            d2 = sqrt(dxn * dxn + dyn * dyn);
            E2 = c2.value / (d2 * d2);
            //electric field components due to charge 2
            E2x = dxn * E2 / d2;
            E2y = dyn * E2 / d2;

            dxp = x - c3.x;
            dyp = y - c3.y;
            d3 = sqrt(dxp * dxp + dyp * dyp);
            E3 = c3.value / (d3 * d3);
            E3x = dxp * E3 / d3;
            E3y = dyp * E3 / d3;


            //net electric field in x and y due to both at a single point 
            EEx = E1x + E2x + E3x;
            EEy = E1y + E2y + E3y;
            EE = sqrt(EEx * EEx + EEy * EEy);

            //setting the value of electric field in a limited range(normalizing)
            deltax = 15 * EEx / EE;
            deltay = 15 * EEy / EE;

            //setting the new normalized electric field at x and y
            grid_X[i][j] = deltax;
            grid_Y[i][j] = deltay;



        }

    }
}

function drawFieldLines() {


    for (let i = 0; i < 5000; i++) {

        //draws lines displaying the field lines
        x = random(width);
        let xf = floor(x / (res));
        y = random(height);
        let yf = floor(y / (res));

        stroke(255);
        line(x, y, x + grid_X[xf][yf], y + grid_Y[xf][yf])


    }
}