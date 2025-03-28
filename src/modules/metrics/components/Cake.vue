<template>
    <Doughnut id="my-doughnut-id" :options="doughnutOptions" :data="doughnutData" />
</template>

<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs'
import { ref } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const doughnutData = ref({
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
        {
            label: 'Distribución de ventas',
            data: [40, 30, 30],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }
    ]
});

const doughnutOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Distribución de Ventas',
            font: {
                size: 24,
            }
        },
        legend: {
            display: true,
            labels: {
                color: 'black',
                font: {
                    size: 16
                }
            }
        }
    }
});
</script>