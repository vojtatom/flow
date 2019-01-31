'use strict';

class GlyphProgram extends Program {
    constructor(gl) {
        if(!GlyphProgram.instance){
            super(gl);
            DataManager.files({
                files: [
                    Shader.dir + 'glyph_vs.glsl',
                    Shader.dir + 'glyph_fs.glsl',
                ],
                success: (f) => {
                        this.init(...f)
                        this.setup();
                    },
                fail: (r) => { console.error(r); },
                });

            GlyphProgram.instance = this;
        }
        
        return GlyphProgram.instance;
    }

    setup(){
        this.setupAttributes({
            position: 'vertPosition',
            normal: 'vertNormal',
			fieldPos: 'fieldPosition',
			fieldVal: 'fieldValue',
        });

        this.setupUniforms({
            //matrices
            model: 'mWorld',
			view: 'mView',
            proj: 'mProj',
            
            //stats and scaling
			median: 'medianSize',
			std: 'stdSize',
            size: 'glyphSize',
            
            //modifications
            light: 'light',
            brightness: 'brightness',
            appearance: 'appearance',
            scale: 'scale',

            //colormap
            colorMapSize: 'colorMapSize',
            colorMap0: 'colorMap[0]',
            colorMap1: 'colorMap[1]',
            colorMap2: 'colorMap[2]',
            colorMap3: 'colorMap[3]',
            colorMap4: 'colorMap[4]',
        });
    }

    setFieldPositionAttrs(){
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.attributes.fieldPos);
        this.gl.vertexAttribPointer(this.attributes.fieldPos, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.vertexAttribDivisor(this.attributes.fieldPos, 1);
        this.gl.useProgram(null);
    }

    setFieldValueAttrs(){
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.attributes.fieldVal);
        this.gl.vertexAttribPointer(this.attributes.fieldVal, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.vertexAttribDivisor(this.attributes.fieldVal, 1);
        this.gl.useProgram(null);
    }

    setVertexPositionAttrs(){
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.attributes.position);
        this.gl.vertexAttribPointer(this.attributes.position, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.useProgram(null);
    }

    setVertexNormalAttrs(){
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.attributes.normal);
        this.gl.vertexAttribPointer(this.attributes.normal, 3, this.gl.FLOAT, this.gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.useProgram(null);
    }

    setUnifs(options) {
        this.gl.uniformMatrix4fv(this.uniforms.model, this.gl.FALSE, options.model);
        this.gl.uniformMatrix4fv(this.uniforms.view, this.gl.FALSE, options.view);
        this.gl.uniformMatrix4fv(this.uniforms.proj, this.gl.FALSE, options.projection);

        this.gl.uniform1f(this.uniforms.median, options.median);
        this.gl.uniform1f(this.uniforms.std, options.std);
        this.gl.uniform1f(this.uniforms.size, options.size);

        this.gl.uniform3fv(this.uniforms.light, options.light);
        this.gl.uniform1f(this.uniforms.brightness, options.brightness);
        this.gl.uniform1i(this.uniforms.appearance, options.appearance);
        this.gl.uniform1i(this.uniforms.scale, options.scale);
        
        this.gl.uniform1i(this.uniforms.colorMapSize, options.colorMapSize);
        this.gl.uniform4fv(this.uniforms.colorMap0, options.colorMap0);
        this.gl.uniform4fv(this.uniforms.colorMap1, options.colorMap1);
        this.gl.uniform4fv(this.uniforms.colorMap2, options.colorMap2);
        this.gl.uniform4fv(this.uniforms.colorMap3, options.colorMap3);
        this.gl.uniform4fv(this.uniforms.colorMap4, options.colorMap4);
    }
}