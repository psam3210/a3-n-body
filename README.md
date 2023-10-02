# A3: N-Body

Refer back to A1 for information on running the development server, and with running tests locally.

This assignment is based off an [assignment by the same](https://www.cs.princeton.edu/courses/cos126/assignments/nbody/) name that is taught in Princeton’s introductory CS class, COS 126.

<img src="https://user-images.githubusercontent.com/207651/184454935-d751f2d2-64ba-4bec-8db8-7f4cda9206ce.gif" width="500">

In this assignment we’re going to explore how we can use loops, arrays, and objects, to create a working physics simulation model of our Solar System.

Our goal is to accurately model the rotation of the inner planets around the Sun using laws of gravitational forces on objects. Such modeling may seem abstract for a design course, but in fact can be the basis for some of the most common interface paradigms such as [pull to refresh modeling a spring](https://developer.android.com/guide/topics/graphics/spring-animation). One thing you’ll learn is that technical implementation of design is often grounded in math.

You may choose to complete this assignment individually or with a partner.

<br>

> This is a computer science class first, a design class second, and an orbital dynamics class third.
> 
> — Michael Fehrenbach

<br>

## Approach
In physics, the gravitational forces $F$ two bodies in space apply on each other can be defined using [Newton’s law of universal gravitation](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation). $$F={G m_1 m_2 \over r^2}$$ Here, $G$ is the Gravitational constant, defined by $6.67 \times 10^{-11} N \cdot m^2 \cdot kg^{-2}$, $m_1$ is the mass of the first body in kilograms, $m_2$ is the mass of the second body in kilograms, and $r$ is the distance between the two bodies in meters. The distance between the two bodies on an $(x,y)$ plane where body 1 is located at $(x_1, y_1)$ and body 2 is located at $(x_2, y_2)$ is defined as: $$r = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$ Since our representation of the universe uses an $(x,y)$ coordinate system, we’ll need to break our forces down into an $x$ and $y$ component as well. To do that, we can derive that: $$F_x = \frac{F(x_2-x_1)}{r}$$ $$F_y = \frac{F(y_2-y_1)}{r}$$ If you remember from physics, the net force on a single body can be calculated by summing up the forces of a body with all other bodies in a system. For example, if we were calculating the forces on Earth, we would sum up: $$F_{Earth} = F_{Earth \rightarrow Sun}+F_{Earth \rightarrow Mercury} + F_{Earth \rightarrow Venus} + F_{Earth \rightarrow Mars}$$ Now that we have the total forces on a body, we can use kinematic equations to update its state: $$a_x = {F_x} / {m}, a_y = {F_y} / {m}$$ $$v_x = v_x + a_x\Delta t, v_y = v_y + a_y\Delta t$$ $$x = x + v_x\Delta t, y = y+ v_y \Delta t$$ Note that the introduction of $\Delta t$ is used to model the passage of time from one moment to the next. Since computers have to iterate over a discrete amount of data, we have to break time into a small fraction. Don’t worry, you’ll be provided a value for $\Delta t$ as an input to your function. Now that the positions of each body have updated, we rerun all the calcuations until the end of time, or until our computers run out of power.

## Implementation

You are expected to implement a function `step()` which takes as input a `contextWrapper` and `deltaT`. We will use `deltaT` in our physics calculations, and `contextWrapper` is a wrapper for the HTML `<canvas>` object which provides some pretty handy operations for us. 

The HTML `<canvas>` object is an element that provides us a blank surface on which to draw shapes and images. Normally, the origin `(0,0)` point of a `<canvas>` is in the top left corner. However, `contextWrapper` also sets the `(0,0)` origin to the center of the canvas, so that you can perform standard grid operations without worrying about translating them.

```
contextWrapper.setScale(10) // Sets the bounds of the canvas from -10 to 10 in both the X and Y direction
contextWrapper.setScale(3.2e5) // Sets the bounds of the canvas from -320000 to 320000 in both the X and Y direction

contextWrapper.clear() // Clears all the elements currently drawn on the canvas

contextWrapper.drawImage('earth.gif', 50, 50) // Draws an image with the filename earth.gif at the coordinates (50, 50)
contextWrapper.drawImage('sun.gif', 0, 0) // Draws an image with the filename sun.gif at the coordinates (0, 0)
```

We also provide some utility functions that allow you to not worry about the more complicated math for calculating `F` and `r`. These are `distance()` and `force()`.

```
distance(0, 0, 25, 25) // Calculates the distance from (0, 0) to (25, 25) and will return 35.35533905932738m

force(10, 20, 9) // Calculates the force between a body with mass 10kg and a body with mass 20kg, which are 9m apart. It will return 1.6469135802469134e-10N
```

We also provide an initial state of the system in a `config` object. It is formatted in `JSON` notation, and you can access elements like such:

```
config.scale // Will give you the scale 2.50e+11m

config.bodies // Will give you an array of all the bodies in the system
config.bodies.length // Will give you the length of the bodies array, 5
config.bodies[0].x // Will give you the x position of the body at index 0, 1.4960e+11
config.bodies[i].image // Will give you the image string of the body at index i. If i is 0, it is 'earth.gif'
```

From here, we will call the `step(contextWrapper, deltaT)` function at every time step. For example, if we run the simulation for 10 seconds, and set `deltaT=1` then, `step()` will be called 10 times. How you update the values is up to you, though we recommend updating the values in `config`. The only values not accounted for are the forces, so you will need to handle that. You are responsible for drawing setting the scale of the canvas, updating the forces, accelerations, velocities, and positions, and redrawing the images on the canvas.

## Heuristic
Every time step is called:
- Set the scale of the canvas
- Initialize $f_x$ and $f_y$ arrays with length of `config.bodies` to 0
- Iterate through bodies and calculate net forces on all other bodies with itself
  - You’ll use a nested for loop here to calculate the force that `bodies[i]` exerts on `bodies[j]`
  - Call `distance()` and `force()` to calculate $F$ and $r$
  - $\Delta x$ is the difference between the two bodies `x` positions
  - $\Delta y$ is the difference between the two bodies `y` positions
  - $f_x = f_x + F \cdot \Delta x \div r$
  - $f_y = f_y + F \cdot \Delta y \div r$
  - At the end of this, you should have `fx` and `fy` arrays where `fx[i]` represents the net force on the body at `config.bodies[i]`.
- In a second loop, you'll update the position of the body
  - $a_x = {f_x}/{m}$
  - $a_y = {f_y}/{m}$
  - $v_x = v_x + a_x \cdot \Delta t$
  - $v_y = v_y + a_y \cdot \Delta t$
  - $x = x + v_x \cdot \Delta t$
  - $y = y + v_y \cdot \Delta t$
- Clear the canvas
- In a third loop, you'll redraw the bodies at their new position

## Testing your code
After your simulation runs, the console will print out the state of the system. You can double check the correctness of your code against the following:

```js
// After 1 step
{
    "scale": 250000000000,
    "bodies": [
        {
            "x": 149596294976.13806,
            "y": 745000000,
            "vx": -148.20095447794512,
            "vy": 29800,
            "m": 5.974e+24,
            "image": "earth.gif"
        },
        {
            "x": 227898403507.00397,
            "y": 602500000,
            "vx": -63.85971984155002,
            "vy": 24100,
            "m": 6.419e+23,
            "image": "mars.gif"
        },
        {
            "x": 57875266728.6631,
            "y": 1197500000,
            "vx": -989.3308534758991,
            "vy": 47900,
            "m": 3.302e+23,
            "image": "mercury.gif"
        },
        {
            "x": 33.08672331665469,
            "y": 0,
            "vx": 0.0013234689326661877,
            "vy": 0,
            "m": 1.989e+30,
            "image": "sun.gif"
        },
        {
            "x": 108192917649.39906,
            "y": 875000000,
            "vx": -283.2940240373321,
            "vy": 35000,
            "m": 4.869e+24,
            "image": "venus.gif"
        }
    ]
}
```

```js
// After 2 steps
{
    "scale": 250000000000,
    "bodies": [
        {
            "x": 149588884882.74554,
            "y": 1489981549.4428673,
            "vx": -296.4037357004794,
            "vy": 29799.261977714694,
            "m": 5.974e+24,
            "image": "earth.gif"
        },
        {
            "x": 227895210515.38525,
            "y": 1204995779.555552,
            "vx": -127.7196647481163,
            "vy": 24099.831182222082,
            "m": 6.419e+23,
            "image": "mars.gif"
        },
        {
            "x": 57825794929.85129,
            "y": 2394488130.9535027,
            "vx": -1978.8719524726184,
            "vy": 47879.5252381401,
            "m": 3.302e+23,
            "image": "mercury.gif"
        },
        {
            "x": 99.26175045182649,
            "y": 0.2819781319017126,
            "vx": 0.002647001085406872,
            "vy": 0.000011279125276068505,
            "m": 1.989e+30,
            "image": "sun.gif"
        },
        {
            "x": 108178752715.78697,
            "y": 1749942718.7074149,
            "vx": -566.5973444837399,
            "vy": 34997.708748296594,
            "m": 4.869e+24,
            "image": "venus.gif"
        }
    ]
}
```

```js
// After 10 steps
{
    "scale": 250000000000,
    "bodies": [
        {
            "x": 149396246571.52057,
            "y": 7446955571.75134,
            "vx": -1481.649273645716,
            "vy": 29766.788518544894,
            "m": 5.974e+24,
            "image": "earth.gif"
        },
        {
            "x": 227812195623.52292,
            "y": 6024303620.281757,
            "vx": -638.5539920819735,
            "vy": 24092.403155693417,
            "m": 6.419e+23,
            "image": "mars.gif"
        },
        {
            "x": 56542321418.30667,
            "y": 11890501704.690138,
            "vx": -9851.56436266075,
            "vy": 46978.43297205313,
            "m": 3.302e+23,
            "image": "mercury.gif"
        },
        {
            "x": 1818.9801107258138,
            "y": 46.535144538183104,
            "vx": 0.013222250173643316,
            "vy": 0.0005076075707303472,
            "m": 1.989e+30,
            "image": "sun.gif"
        },
        {
            "x": 107810585056.15906,
            "y": 8740547824.013866,
            "vx": -2831.137497340121,
            "vy": 34896.88884350351,
            "m": 4.869e+24,
            "image": "venus.gif"
        }
    ]
}
```
