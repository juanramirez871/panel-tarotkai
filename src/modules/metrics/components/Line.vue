<template>
    <Line id="my-line-chart" :options="lineOptions" :data="lineData" />
</template>

<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const lineData = ref({
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
            label: 'clientes nuevos',
            data: [40, 20, 12, 50, 30, 45, 60, 10, 5, 25, 35, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
        }
    ]
});

const lineOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Gráfico de Clientes Nuevos',
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