let render;
let magics = [];
let fps;

function Renderer() {
    this.createProgram = () => {
        let vertexShader =
            this.gl.createsShader(this.gl.VERTEX_sHADER);
        this.gl.shaderSource(vertexShader,
            this.vertexShaderSource);
        this.gl.compileShader(vertexShader);

        let fragmentShader =
            this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader,
            this.fragmentShaderSource);

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram,
            vertexShader);
        this.gl.attachShader(shaderProgram,
            fragmentShader);
        this.gl.linkProgram(shaderProgram);

        return shaderProgram;
    }

    this.createVelocities = (numberOfPoints, min = - 0.0005, max = 0.0005) => {
        let points = [];

        for (let i = 0; i < numberOfPoints; i++) {
            let vec = [rand(min, max), rand(min, max),
            rand(min, max)];
            points.push(...vec);
            points.push(...vec);
            points.push(...vec);
        }
        return new Float32Array(points);
    }

    this.createVerticies = (numberOfPoints, x = 0, y = 0, z = 0) => {
        let points = [];

        for (let i = 0; i < numberOfPoints; i++) {
            let vec =
                [rand(-0.01, 0.01) + x, rand(-0.01, 0.01) + y, rand(-0.01, 0.01) + z];

            points.push(...vec);

            vec = vec.map(p => p += rand(-0.03, 0.03));
            points.push(...vec);

            vec = vec.map(p => p += rand(-0.03, 0.03));
            points.push(...vec);
        }
        return new Float32Array(points);
    }
    this.createColors = (numberOfPoints) => {
        baseColor = [0, rand(0.15, 02),
            rand(0.01, 0.15)];

        let points[];

        for (let i = 0; i < numberOfPoints; i++) {
            let colorVaried =
                baseColor.map(c => c * rand(0.9, 1.1));
            points.push(...colorVaried);
            points.push(...colorVaried);
            points.push(...colorVaried);
        }
        return new Float32Array(points);
    }

    this.vertexShaderSource = `
        precision mediump float;
        
        attribute vec3 vertex_position;
        attribute vec3 initial_velocity;
        attribute vec3 frag_color;
        
        uniform mat4 model_matrix;
        uniform mat4 view_matrix;
        uniform mat4 projection_matrix;
        uniform float time;
        uniform float alpha;
        
        varying vec3 color;
        varying vec4 position;
        
        void main() {
            float gravity = 0.0;

            color=(alpha + 0.2) * frag_color;
            vec4 current_position =
        vec4(vertex_position.x + pow(0.999, time) * initial_velocity.x * time, vertex_position.y +
         initial_velocity.y * time + gravity * time * time;
         vertex_position.z + initial_velocity.z * time, 1);
         position = current.position;
         mat4 mvp = projection_matrix * view_matrix * model_matrix;
         gl-Position = mvp * current_position;
         gl_PointSize = 6.0;
        }
        `
    this.fragmentShaderSource = `
        precision medium float;

        varying vec3 color;
        varying vec3 position;

        uniform float alpha;

        void main() {
            gl_FragColor = vec4(color, alpha) + 0.2 * position;
        }
        `

    this.update = (now) => {
        const center = vec3.add(vec3.create(), this.camera.translation, [0, 0, 1]);

        mat4.lookAt(this.viewMatrix, this.camera.translation, center, [0, 1, 0]);
    }

    this.renderFire = (fw) => {
        this.gl.enable(this.gl.BLEND)
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
        // Continue ln.128
    }
}
}