<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
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
const chartData = ref({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
            label: 'llamadas',
            data: [40, 20, 12, 50, 30, 45, 60, 10, 5, 25, 35, 15],
            backgroundColor: '#0076bd33',
            borderColor: '#0076bd52',
            borderWidth: 2,
        }
    ],

});

const chartOptions = ref({
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Gráfico de Llamadas',
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
    },
    scales: {
        x: {
            ticks: {
                color: 'black',
                font: {
                    size: 14
                }
            }
        },
        y: {
            ticks: {
                color: 'black',
                font: {
                    size: 14
                }
            }
        }
    }
});
</script>