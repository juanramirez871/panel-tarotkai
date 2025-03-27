<template>
	<h1>Metas Generales</h1>
	<br />
	<section class="light">
		<div class="">
			<article class="postcard light blue">
				<a class="postcard__img_link" href="#">
					<img class="postcard__img"
						src="https://media.licdn.com/dms/image/v2/C4E12AQF5ZbQkICx12g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1597172250188?e=2147483647&v=beta&t=MXVrK45gaFrirf-gaPwonwbdrFnMh27difRc5Q3MaGM"
						alt="Image Title" />
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title blue"><a href="#">Meta Anual</a></h1>
					<br />
					<div class="postcard__subtitle small">
						<div style="display: flex; gap: 20px;">
							<el-statistic title="Llamadas Realizadas" :value="outputValue" />
							<el-statistic title="Meta de llamadas" :value="400" />
						</div>
						<br />
						<el-progress :percentage="50" duration="2" :text-inside="true" :stroke-width="26"
							:color="customColors" />
					</div>

				</div>
			</article>
			<article class="postcard light red">
				<a class="postcard__img_link" href="#">
					<img class="postcard__img"
						src="https://media.licdn.com/dms/image/v2/D4E12AQH0sg2vvyBYcA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1683276067448?e=2147483647&v=beta&t=YUBeWA9DXnstxCS0kWb12me04ewRkecbzKp5579_ORk"
						alt="Image Title" />
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title red"><a href="#">Meta Mensual</a></h1>
					<br />
					<div class="postcard__subtitle small">
						<div style="display: flex; gap: 20px;">
							<el-statistic title="Llamadas Realizadas" :value="outputValue" />
							<el-statistic title="Meta de llamadas" :value="400" />
						</div>
						<br />
						<el-progress :percentage="100" duration="2" :text-inside="true" :stroke-width="26"
							:color="customColors" />
					</div>
				</div>
			</article>
			<article class="postcard light green">
				<a class="postcard__img_link" href="#">
					<img class="postcard__img"
						src="https://static.vecteezy.com/system/resources/previews/007/956/110/non_2x/search-for-solutions-thought-is-reachable-career-growth-man-goes-the-path-to-success-with-idea-and-concept-flat-color-icons-business-flat-illustration-vector.jpg"
						alt="Image Title" />
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title green"><a href="#">Meta Semanal</a></h1>
					<br />
					<div class="postcard__subtitle small">
						<div style="display: flex; gap: 20px;">
							<el-statistic title="Llamadas Realizadas" :value="outputValue" />
							<el-statistic title="Meta de llamadas" :value="400" />
						</div>
						<br />
						<el-progress :percentage="20" duration="2" :text-inside="true" :stroke-width="26"
							:color="customColors" />
					</div>
				</div>
			</article>
		</div>
	</section>

	<h1>Metas Individuales</h1>
	<br />
	<p>Filtro de metas individuales </p>
	<el-select v-model="filterRange" placeholder="Select" size="large" style="width: 240px">
		<el-option v-for="item, i in ['semanal', 'mensual', 'anual']" :key="i" :label="item" :value="i" />
	</el-select>
	<br />
	<br />
	<br />
	<div style="display: flex; width: 100%; gap: 20px; flex-wrap: wrap;">
		<article class="postcard light yellow min-card">
			<div class="postcard__text t-dark">
				<h1 class="postcard__title yellow"><a href="#">Meta de Gabriel</a></h1>
				<br />
				<div style="display: flex; gap: 20px;">
					<el-statistic title="Llamadas Realizadas" :value="outputValue" />
					<el-statistic title="Meta de llamadas" :value="400" />
				</div>
				<br />
				<el-progress :percentage="90" :color="customColors" />
			</div>
		</article>
		<article class="postcard light green min-card">
			<div class="postcard__text t-dark">
				<h1 class="postcard__title green"><a href="#">Meta de Sofia</a></h1>
				<br />
				<div style="display: flex; gap: 20px;">
					<el-statistic title="Llamadas Realizadas" :value="outputValue" />
					<el-statistic title="Meta de llamadas" :value="400" />
				</div>
				<br />
				<el-progress :percentage="60" :color="customColors" />
			</div>
		</article>
		<article class="postcard light yellow min-card">
			<div class="postcard__text t-dark">
				<h1 class="postcard__title yellow"><a href="#">Meta de Luffy</a></h1>
				<br />
				<div style="display: flex; gap: 20px;">
					<el-statistic title="Llamadas Realizadas" :value="outputValue" />
					<el-statistic title="Meta de llamadas" :value="400" />
				</div>
				<br />
				<el-progress :percentage="30" :color="customColors" />
			</div>
		</article>
		<article class="postcard light blue min-card">
			<div class="postcard__text t-dark">
				<h1 class="postcard__title yellow"><a href="#">Meta de Cristian</a></h1>
				<br />
				<div style="display: flex; gap: 20px;">
					<el-statistic title="Llamadas Realizadas" :value="outputValue" />
					<el-statistic title="Meta de llamadas" :value="400" />
				</div>
				<br />
				<el-progress :percentage="90" :color="customColors" />
			</div>
		</article>
	</div>
</template>

<script lang="ts" setup>
import { useTransition } from '@vueuse/core'
import { ref } from 'vue'

const source = ref(0)
const filterRange = ref(1)
const outputValue = useTransition(source, {
	duration: 2000,
})
source.value = 121
const customColors = [
	{ color: '#f56c6c', percentage: 20 },
	{ color: '#cb362f', percentage: 40 },
	{ color: '#0076bd', percentage: 60 },
	{ color: '#1989fa', percentage: 80 },
	{ color: '#5cb87a', percentage: 100 },
]
</script>

<style lang="scss" scoped>
$main-green: #79dd09 !default;
$main-green-rgb-015: rgba(121, 221, 9, 0.1) !default;
$main-yellow: #bdbb49 !default;
$main-yellow-rgb-015: rgba(189, 187, 73, 0.1) !default;
$main-red: #bd150b !default;
$main-red-rgb-015: rgba(189, 21, 11, 0.1) !default;
$main-blue: #0076bd !default;
$main-blue-rgb-015: rgba(0, 118, 189, 0.1) !default;

.min-card {
	min-width: 500px;
}

.dark {
	background: #110f16;
}


.light {
	background: #f3f5f7;
}

a,
a:hover {
	text-decoration: none;
	transition: color 0.3s ease-in-out;
}

#pageHeaderTitle {
	margin: 2rem 0;
	text-transform: uppercase;
	text-align: center;
	font-size: 2.5rem;
}

/* Cards */
.postcard {
	flex-wrap: wrap;
	display: flex;

	box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
	border-radius: 10px;
	margin: 0 0 2rem 0;
	overflow: hidden;
	position: relative;
	color: #ffffff;

	&.dark {
		background-color: #18151f;
	}

	&.light {
		background-color: #e1e5ea;
	}

	.t-dark {
		color: #18151f;
	}

	a {
		color: inherit;
	}

	h1,
	.h1 {
		margin-bottom: 0.5rem;
		font-weight: 500;
		line-height: 1.2;
	}

	.small {
		font-size: 80%;
	}

	.postcard__title {
		font-size: 1.45rem;
	}

	.postcard__img {
		max-height: 180px;
		width: 100%;
		object-fit: cover;
		position: relative;
	}

	.postcard__img_link {
		display: contents;
	}

	.postcard__bar {
		width: 50px;
		height: 10px;
		margin: 10px 0;
		border-radius: 5px;
		background-color: #424242;
		transition: width 0.2s ease;
	}

	.postcard__text {
		padding: 1.5rem;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.postcard__preview-txt {
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: justify;
		height: 100%;
	}

	.postcard__tagbox {
		display: flex;
		flex-flow: row wrap;
		font-size: 14px;
		margin: 20px 0 0 0;
		padding: 0;
		justify-content: center;

		.tag__item {
			display: inline-block;
			background: rgba(83, 83, 83, 0.4);
			border-radius: 3px;
			padding: 2.5px 10px;
			margin: 0 5px 5px 0;
			cursor: default;
			user-select: none;
			transition: background-color 0.3s;
		}
	}

	&:before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: linear-gradient(-70deg, #424242, transparent 50%);
		opacity: 1;
		border-radius: 10px;
	}
}

@media screen and (min-width: 769px) {
	.postcard {
		flex-wrap: inherit;

		.postcard__title {
			font-size: 2rem;
		}

		.postcard__tagbox {
			justify-content: start;
		}

		.postcard__img {
			max-width: 300px;
			max-height: 100%;
			transition: transform 0.3s ease;
		}

		.postcard__text {
			padding: 3rem;
			width: 100%;
		}

		.media.postcard__text:before {
			content: "";
			position: absolute;
			display: block;
			background: #18151f;
			top: -20%;
			height: 130%;
			width: 55px;
		}

		&:hover .postcard__img {
			transform: scale(1.1);
		}

		&:nth-child(2n+1) {
			flex-direction: row;
		}

		&:nth-child(2n+0) {
			flex-direction: row-reverse;
		}

		&:nth-child(2n+1) .postcard__text::before {
			left: -12px !important;
			transform: rotate(4deg);
		}

		&:nth-child(2n+0) .postcard__text::before {
			right: -12px !important;
			transform: rotate(-4deg);
		}
	}
}

@media screen and (min-width: 1024px) {
	.postcard__text {
		padding: 2rem 3.5rem;
	}

	.postcard__text:before {
		content: "";
		position: absolute;
		display: block;

		top: -20%;
		height: 130%;
		width: 55px;
	}

	.postcard.dark {
		.postcard__text:before {
			background: #18151f;
		}
	}

	.postcard.light {
		.postcard__text:before {
			background: #e1e5ea;
		}
	}
}

/* COLORS */

.green .postcard__bar {
	background-color: $main-green;
}

.green::before {
	background-image: linear-gradient(-30deg,
			$main-green-rgb-015,
			transparent 50%);
}

.green:nth-child(2n)::before {
	background-image: linear-gradient(30deg, $main-green-rgb-015, transparent 50%);
}

.postcard .postcard__tagbox .blue.play:hover {
	background: $main-blue;
}

.blue .postcard__bar {
	background-color: $main-blue;
}

.blue::before {
	background-image: linear-gradient(-30deg, $main-blue-rgb-015, transparent 50%);
}

.blue:nth-child(2n)::before {
	background-image: linear-gradient(30deg, $main-blue-rgb-015, transparent 50%);
}

.red .postcard__bar {
	background-color: $main-red;
}

.red::before {
	background-image: linear-gradient(-30deg, $main-red-rgb-015, transparent 50%);
}

.red:nth-child(2n)::before {
	background-image: linear-gradient(30deg, $main-red-rgb-015, transparent 50%);
}

.yellow .postcard__bar {
	background-color: $main-yellow;
}

.yellow::before {
	background-image: linear-gradient(-30deg,
			$main-yellow-rgb-015,
			transparent 50%);
}

.yellow:nth-child(2n)::before {
	background-image: linear-gradient(30deg,
			$main-yellow-rgb-015,
			transparent 50%);
}

@media screen and (min-width: 769px) {
	.green::before {
		background-image: linear-gradient(-80deg,
				$main-green-rgb-015,
				transparent 50%);
	}

	.green:nth-child(2n)::before {
		background-image: linear-gradient(80deg,
				$main-green-rgb-015,
				transparent 50%);
	}

	.blue::before {
		background-image: linear-gradient(-80deg,
				$main-blue-rgb-015,
				transparent 50%);
	}

	.blue:nth-child(2n)::before {
		background-image: linear-gradient(80deg, $main-blue-rgb-015, transparent 50%);
	}

	.red::before {
		background-image: linear-gradient(-80deg, $main-red-rgb-015, transparent 50%);
	}

	.red:nth-child(2n)::before {
		background-image: linear-gradient(80deg, $main-red-rgb-015, transparent 50%);
	}

	.yellow::before {
		background-image: linear-gradient(-80deg,
				$main-yellow-rgb-015,
				transparent 50%);
	}

	.yellow:nth-child(2n)::before {
		background-image: linear-gradient(80deg,
				$main-yellow-rgb-015,
				transparent 50%);
	}
}
</style>
