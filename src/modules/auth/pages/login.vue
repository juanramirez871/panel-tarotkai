<template>
	<div id="back">
		<canvas id="canvas" class="canvas-back"></canvas>
		<div class="backRight"></div>
		<div class="backLeft"></div>
	</div>

	<div id="slideBox">
		<div class="topLayer">
			<div class="left">
				<div class="content">
					<h2>Iniciar Sesión</h2>
					<form id="form-signup" method="post" @submit.prevent>
						<div class="form-element form-stack">
							<label for="email" class="form-label">correo</label>
							<input id="email" type="email" name="email" />
						</div>
						<div class="form-element form-stack">
							<label for="password-signup" class="form-label">contraseña</label>
							<input id="password-signup" type="password" name="password" />
						</div>
						<div class="form-element form-submit">
							<button id="signUp" class="signup" type="submit" name="signup">Iniciar Sesión</button>
							<button id="goLeft" class="signup off" type="button">Crear Cuenta</button>
						</div>
					</form>
				</div>
			</div>
			<div class="right">
				<div class="content">
					<h2>Crear Cuenta</h2>
					<form id="form-login" method="post" @submit.prevent>
						<div class="form-element form-stack">
							<label for="username-login" class="form-label">correo</label>
							<input id="username-login" type="text" name="username" />
						</div>
						<div class="form-element form-stack">
							<label for="password-login" class="form-label">contraseña</label>
							<input id="password-login" type="password" name="password" />
						</div>
						<div class="form-element form-submit">
							<button id="logIn" class="login" type="submit" name="login">Crear Cuenta</button>
							<button id="goRight" class="login off" type="button">Iniciar Sesión</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
	function animate(element, properties, duration = 500) {
		for (let property in properties) {
			element.style.transition = `${property} ${duration}ms`
		}
		element.offsetWidth
		for (let property in properties) {
			element.style[property] = properties[property]
		}
	}

	function goRight() {
		const slideBox = document.getElementById('slideBox')
		animate(slideBox, { marginLeft: '0' })

		const topLayers = document.querySelectorAll('.topLayer')
		topLayers.forEach(function (layer) {
			animate(layer, { marginLeft: '100%' })
		})
	}

	goRight()
	document.getElementById('goRight').addEventListener('click', goRight)

	document.getElementById('goLeft').addEventListener('click', function () {
		const slideBox = document.getElementById('slideBox')
		if (window.innerWidth > 769) {
			animate(slideBox, { marginLeft: '50%' })
		} else {
			animate(slideBox, { marginLeft: '20%' })
		}

		const topLayers = document.querySelectorAll('.topLayer')
		topLayers.forEach(function (layer) {
			animate(layer, { marginLeft: '0' })
		})
	})

	paper.install(window)
	paper.setup(document.getElementById('canvas'))

	let canvasWidth,
		canvasHeight,
		canvasMiddleX,
		canvasMiddleY

	const shapeGroup = new Group()
	let positionArray = []

	function getCanvasBounds() {
		canvasWidth = view.size.width
		canvasHeight = view.size.height
		canvasMiddleX = canvasWidth / 2
		canvasMiddleY = canvasHeight / 2

		const position1 = { x: (canvasMiddleX / 2) + 100, y: 100 }
		const position2 = { x: 200, y: canvasMiddleY }
		const position3 = { x: (canvasMiddleX - 50) + (canvasMiddleX / 2), y: 150 }
		const position4 = { x: 0, y: canvasMiddleY + 100 }
		const position5 = { x: canvasWidth - 130, y: canvasHeight - 75 }
		const position6 = { x: canvasMiddleX + 80, y: canvasHeight - 50 }
		const position7 = { x: canvasWidth + 60, y: canvasMiddleX - 50 }
		const position8 = { x: canvasMiddleX + 100, y: canvasMiddleY + 100 }

		positionArray = [position3, position2, position5, position4, position1, position6, position7, position8]
	}

	function initializeShapes() {
		getCanvasBounds()

		const shapePathData = [
			'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
			'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
			'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
			'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
			'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
			'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
			'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
			'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
		]

		for (let i = 0; i < shapePathData.length; i++) {
			const headerShape = new Path({
				strokeColor: 'rgba(255, 255, 255, 0.5)',
				strokeWidth: 2,
				parent: shapeGroup,
			})
			headerShape.pathData = shapePathData[i]
			headerShape.scale(2)
			headerShape.position = positionArray[i]
		}
	}

	initializeShapes()

	view.onFrame = function (event) {
		if (event.count % 4 === 0) {
			for (let i = 0; i < shapeGroup.children.length; i++) {
				if (i % 2 === 0) {
					shapeGroup.children[i].rotate(-0.1)
				} else {
					shapeGroup.children[i].rotate(0.1)
				}
			}
		}
	}

	view.onResize = function () {
		getCanvasBounds()
		for (let i = 0; i < shapeGroup.children.length; i++) {
			shapeGroup.children[i].position = positionArray[i]
		}
		if (canvasWidth < 700) {
			shapeGroup.children[3].opacity = 0
			shapeGroup.children[2].opacity = 0
			shapeGroup.children[5].opacity = 0
		} else {
			shapeGroup.children[3].opacity = 1
			shapeGroup.children[2].opacity = 1
			shapeGroup.children[5].opacity = 1
		}
	}
})
</script>


<style lang="scss" scoped>
$theme-signup: #03A9F4;
$theme-signup-darken: #0288D1;
$theme-signup-background: #2C3034;
$theme-login: #673AB7;
$theme-login-darken: #512DA8;
$theme-login-background: #f9f9f9;
$theme-dark: #212121;
$theme-light: #e3e3e3;
$font-default: 'Roboto', sans-serif;

$success: #5cb85c;
$error: #d9534f;

* {
	overflow: hidden !important;
}

body {
	margin: 0;
	height: 100%;
	overflow: hidden;
	width: 100% !important;
	box-sizing: border-box;
	font-family: $font-default;
}

.backRight {
	position: absolute;
	right: 0;
	width: 50%;
	height: 100%;
	background: $theme-signup;
}

.backLeft {
	position: absolute;
	left: 0;
	width: 50%;
	height: 100%;
	background: $theme-login;
}

#back {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -999;
}

.canvas-back {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
}

#slideBox {
	width: 50%;
	max-height: 100%;
	height: 100%;
	overflow: hidden;
	margin-left: 50%;
	position: absolute;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.topLayer {
	width: 200%;
	height: 100%;
	position: relative;
	left: 0;
	left: -100%;
}

label {
	font-size: 0.8em;
	text-transform: uppercase;
}

input {
	background-color: transparent;
	border: 0;
	outline: 0;
	font-size: 1em;
	padding: 8px 1px;
	margin-top: 0.1em;
}

.left {
	width: 50%;
	height: 100%;
	overflow: scroll;
	background: $theme-signup-background;
	left: 0;
	position: absolute;

	label {
		color: $theme-light;
	}

	input {
		border-bottom: 1px solid $theme-light;
		color: $theme-light;

		&:focus,
		&:active {
			border-color: $theme-signup;
			color: $theme-signup;
		}

		&:-webkit-autofill {
			-webkit-box-shadow: 0 0 0 30px $theme-signup-background inset;
			-webkit-text-fill-color: $theme-light;
		}
	}

	a {
		color: $theme-signup;
	}
}

.right {
	width: 50%;
	height: 100%;
	overflow: scroll;
	background: $theme-login-background;
	right: 0;
	position: absolute;

	label {
		color: $theme-dark;
	}

	input {
		border-bottom: 1px solid $theme-dark;

		&:focus,
		&:active {
			border-color: $theme-login;
		}

		&:-webkit-autofill {
			-webkit-box-shadow: 0 0 0 30px $theme-login-background inset;
			-webkit-text-fill-color: $theme-dark;
		}
	}
}

.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100%;
	width: 80%;
	margin: 0 auto;
	position: relative;
}

.content h2 {
	font-weight: 300;
	font-size: 2.6em;
	margin: 0.2em 0 0.1em;
}

.left .content h2 {
	color: $theme-signup;
}

.right .content h2 {
	color: $theme-login;
}

.form-element {
	margin: 1.6em 0;

	&.form-submit {
		margin: 1.6em 0 0;
	}
}

.form-stack {
	display: flex;
	flex-direction: column;
}

.checkbox {
	-webkit-appearance: none;
	outline: none;
	background-color: $theme-light;
	border: 1px solid $theme-light;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
	padding: 12px;
	border-radius: 4px;
	display: inline-block;
	position: relative;
}

.checkbox:focus,
.checkbox:checked:focus,
.checkbox:active,
.checkbox:checked:active {
	border-color: $theme-signup;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.checkbox:checked {
	outline: none;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
}

.checkbox:checked:after {
	outline: none;
	content: '\2713';
	color: $theme-signup;
	font-size: 1.4em;
	font-weight: 900;
	position: absolute;
	top: -4px;
	left: 4px;
}

.form-checkbox {
	display: flex;
	align-items: center;

	label {
		margin: 0 6px 0;
		font-size: 0.72em;
	}
}

button {
	padding: 0.8em 1.2em;
	margin: 0 10px 0 0;
	width: auto;
	font-weight: 600;
	text-transform: uppercase;
	font-size: 1em;
	color: #fff;
	line-height: 1em;
	letter-spacing: 0.6px;
	border-radius: 3px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
	border: 0;
	outline: 0;
	transition: all 0.25s;

	&.signup {
		background: $theme-signup;
	}

	&.login {
		background: $theme-login;
	}

	&.off {
		background: none;
		box-shadow: none;
		margin: 0;

		&.signup {
			color: $theme-signup;
		}

		&.login {
			color: $theme-login;
		}
	}
}

button:focus,
button:active,
button:hover {
	box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);

	&.signup {
		background: $theme-signup-darken;
	}

	&.login {
		background: $theme-login-darken;
	}

	&.off {
		box-shadow: none;

		&.signup {
			color: $theme-signup;
			background: $theme-dark;
		}

		&.login {
			color: $theme-login-darken;
			background: $theme-light;
		}
	}
}

@media only screen and (max-width: 768px) {
	#slideBox {
		width: 80%;
		margin-left: 20%;
	}

	.signup-info,
	.login-info {
		display: none;
	}
}
</style>