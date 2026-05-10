import { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform float u_particleSpeed;
uniform float u_particleCount;
uniform float u_lightCount;
uniform vec2 u_mouse;
uniform float u_repulsionRadius;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec4 particle(int idx, vec2 uv, float t, float speed, float count) {
  float fi = float(idx);
  float seedX = fi * 1.618;
  float seedY = fi * 2.718;
  float seedZ = fi * 3.141;
  float px = hash(vec2(seedX, seedY)) * 2.4 - 1.2;
  float py = hash(vec2(seedY, seedZ));
  float psize = 0.015 + hash(vec2(seedZ, seedX)) * 0.035;
  float phase = hash(vec2(seedX + 7.0, seedY + 3.0)) * 6.28;
  float driftX = noise(vec2(px * 3.0 + phase, t * 0.3 + fi)) * 0.12 - 0.06;
  float driftY = noise(vec2(py * 2.0 + phase, t * 0.2 + fi + 10.0)) * 0.04 - 0.02;
  float spd = (0.3 + hash(vec2(seedZ + 1.0, seedX + 2.0)) * 0.7) * speed;
  float x = px + driftX + sin(t * 0.15 + phase) * 0.06;
  float y = mod(py + (t * spd * 0.12) + fi * 0.07, 1.0) * 1.6 - 0.3;
  return vec4(x, y, psize, 0.0);
}

vec3 emberColor(float idx) {
  float f = hash(vec2(idx * 1.618, idx * 3.141));
  vec3 warm = mix(vec3(1.0, 0.55, 0.15), vec3(1.0, 0.35, 0.08), f);
  vec3 core = mix(vec3(1.0, 0.85, 0.45), vec3(1.0, 0.7, 0.25), f);
  return mix(warm, core, 0.3);
}

vec3 lightColor(float idx) {
  float f = hash(vec2(idx * 2.718, idx * 1.414));
  vec3 amber = vec3(0.83, 0.52, 0.25);
  vec3 gold = vec3(0.78, 0.64, 0.36);
  return mix(amber, gold, f);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time;
  float speed = u_particleSpeed;
  float count = u_particleCount;
  vec3 col = vec3(0.055, 0.045, 0.04);

  int pCount = int(count + 0.5);
  int lCount = int(u_lightCount);

  vec2 mUV = vec2(-1.0);
  if (u_mouse.x > 0.0) {
    mUV = u_mouse / u_res;
  }

  for (int i = 0; i < 300; i++) {
    if (i >= pCount) break;
    vec4 p = particle(i, uv, t, speed, count);
    float d = length(uv - p.xy);

    if (u_mouse.x > 0.0) {
      float md = length(p.xy - mUV);
      if (md < u_repulsionRadius) {
        float repel = 1.0 - md / u_repulsionRadius;
        repel = repel * repel;
        d += repel * 0.15;
      }
    }

    if (d >= p.z * 4.0) continue;

    float intensity = 1.0 - smoothstep(0.0, p.z, d);
    float inten = pow(intensity, 1.4) * (0.4 + hash(vec2(float(i) * 2.3, float(i) * 1.7)) * 0.6);
    float inten2 = pow(max(1.0 - smoothstep(0.0, p.z * 0.35, d), 0.0), 2.0) * 0.7;
    vec3 eCol = emberColor(float(i));
    col += eCol.rgb * (inten * 0.5) + eCol * inten2;
  }

  col *= 1.6;
  col = clamp(col, 0.0, 1.0);

  float vd = length((uv - 0.5) * vec2(0.9, 1.0));
  float vignette = 1.0 - smoothstep(0.35, 0.85, vd);

  vec3 bloom = max(col - 0.4, 0.0) * 0.5;
  col += bloom * vignette * 0.25;

  col = pow(col, vec3(0.95, 1.0, 1.1));

  for (int j = 0; j < 8; j++) {
    if (j >= lCount) break;
    float lseedX = float(j) * 3.141;
    float lseedY = float(j) * 2.718;
    float lx = (hash(vec2(lseedX, lseedY)) * 1.4 - 0.2) + sin(t * 0.07 + float(j) * 2.0) * 0.15;
    float ly = (hash(vec2(lseedY, lseedX)) * 0.8 + 0.1) + cos(t * 0.05 + float(j) * 1.5) * 0.1;
    float lrad = 0.25 + hash(vec2(lseedX + 5.0, lseedY + 3.0)) * 0.15;
    float lbright = 0.4 + sin(t * 0.3 + float(j) * 1.7) * 0.1;
    float ld = length(uv - vec2(lx, ly));
    if (ld >= lrad * 2.5) continue;
    float lin = (1.0 - smoothstep(0.0, lrad, ld)) * lbright;
    float falloff = 1.0 - smoothstep(0.0, lrad * 2.0, ld);
    col += lightColor(float(j)) * lin * falloff * 0.35;
  }

  col += vec3(0.04, 0.03, 0.025) * (1.0 - vd);
  col = pow(col, vec3(0.4545));
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 70.0 : 200.0;
    const lightCount = isMobile ? 2.0 : 4.0;
    const repulsionRadius = isMobile ? 0.10 : 0.15;

    // Compile shaders
    function createShader(type: number, source: string): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_res');
    const uParticleSpeed = gl.getUniformLocation(program, 'u_particleSpeed');
    const uParticleCount = gl.getUniformLocation(program, 'u_particleCount');
    const uLightCount = gl.getUniformLocation(program, 'u_lightCount');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uRepulsionRadius = gl.getUniformLocation(program, 'u_repulsionRadius');

    gl.uniform1f(uParticleSpeed, 1.0);
    gl.uniform1f(uParticleCount, particleCount);
    gl.uniform1f(uLightCount, lightCount);
    gl.uniform1f(uRepulsionRadius, repulsionRadius);
    gl.uniform2f(uMouse, -1.0, -1.0);

    // Resize
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (canvas!.clientHeight - (e.clientY - rect.top)) * dpr;
    }
    function onMouseLeave() {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    }
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Touch
    function onTouch(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const touch = e.touches[0];
      mouseRef.current.x = (touch.clientX - rect.left) * dpr;
      mouseRef.current.y = (canvas!.clientHeight - (touch.clientY - rect.top)) * dpr;
    }
    function onTouchEnd() {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    }
    canvas.addEventListener('touchstart', onTouch, { passive: true });
    canvas.addEventListener('touchmove', onTouch, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    // Render loop
    function render() {
      const time = performance.now() * 0.001;
      gl!.uniform1f(uTime, time);
      gl!.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouch);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onTouchEnd);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(quadBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        touchAction: 'none',
      }}
    />
  );
}
