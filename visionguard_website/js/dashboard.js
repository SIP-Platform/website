// Dashboard.js - VisionGuard Dashboard Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading overlay after page loads
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }, 800);
    
    // Initialize all charts
    initMetricCharts();
    initRiskTimeChart();
    initInjuryTypesChart();
    initBodyMapChart();
    initVitalSignsCharts();
    initTrainingLoadChart();
    initAcuteChronicRatioChart();
    initFatigueIndexChart();
    initModelPerformanceChart();
    initRiskFactorsChart();
    initTeamComparisonChart();
    initSeasonalTrendsChart();
    initMatchDensityChart();
    initRecoveryMetricsChart();
    initSleepQualityChart();
    
    // Add event listeners
    addEventListeners();
});

// Initialize metric charts (small sparklines)
function initMetricCharts() {
    // Players Chart
    const playersChartOptions = {
        series: [{
            name: 'لاعبين',
            data: [22, 23, 25, 26, 28, 28, 28]
        }],
        chart: {
            type: 'area',
            height: 50,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        colors: ['#4287f5'],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'لاعبين';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#playersChart")) {
        const playersChart = new ApexCharts(document.querySelector("#playersChart"), playersChartOptions);
        playersChart.render();
    }
    
    // Avoided Injuries Chart
    const avoidedChartOptions = {
        series: [{
            name: 'إصابات تم تجنبها',
            data: [5, 7, 8, 9, 10, 11, 12]
        }],
        chart: {
            type: 'area',
            height: 50,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        colors: ['#00e396'],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'إصابات تم تجنبها';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#avoidedChart")) {
        const avoidedChart = new ApexCharts(document.querySelector("#avoidedChart"), avoidedChartOptions);
        avoidedChart.render();
    }
    
    // Expected Injuries Chart
    const expectedChartOptions = {
        series: [{
            name: 'إصابات متوقعة',
            data: [4, 4, 3, 2, 2, 3, 3]
        }],
        chart: {
            type: 'area',
            height: 50,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        colors: ['#ff4560'],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'إصابات متوقعة';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#expectedChart")) {
        const expectedChart = new ApexCharts(document.querySelector("#expectedChart"), expectedChartOptions);
        expectedChart.render();
    }
    
    // Risk Chart
    const riskChartOptions = {
        series: [{
            name: 'مؤشر الخطر',
            data: [32, 30, 28, 26, 25, 26, 27]
        }],
        chart: {
            type: 'area',
            height: 50,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        colors: ['#ffc107'],
        tooltip: {
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'مؤشر الخطر';
                    }
                },
                formatter: function(value) {
                    return value + '%';
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#riskChart")) {
        const riskChart = new ApexCharts(document.querySelector("#riskChart"), riskChartOptions);
        riskChart.render();
    }
}

// Initialize Risk Time Chart
function initRiskTimeChart() {
    const riskTimeChartOptions = {
        series: [{
            name: 'مؤشر خطر الإصابة',
            data: [18, 22, 19, 23, 27, 25, 27]
        }, {
            name: 'متوسط الفريق',
            data: [15, 16, 17, 18, 19, 20, 21]
        }],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            },
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent'
        },
        colors: ['#ff4560', '#4287f5'],
        dataLabels: {
            enabled: true,
            background: {
                enabled: true,
                foreColor: '#121212',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#121212',
                opacity: 0.9,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        grid: {
            borderColor: '#1a1a1a',
            row: {
                colors: ['#111', 'transparent'],
                opacity: 0.2
            },
        },
        markers: {
            size: 4,
            colors: ['#ff4560', '#4287f5'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 7,
            }
        },
        xaxis: {
            categories: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            title: {
                text: 'اليوم',
                style: {
                    color: '#9e9e9e'
                }
            },
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: {
            title: {
                text: 'مؤشر خطر الإصابة (%)',
                style: {
                    color: '#9e9e9e'
                }
            },
            min: 0,
            max: 40,
            labels: {
                style: {
                    colors: '#9e9e9e'
                },
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark'
        }
    };
    
    if(document.querySelector("#riskTimeChart")) {
        const riskTimeChart = new ApexCharts(document.querySelector("#riskTimeChart"), riskTimeChartOptions);
        riskTimeChart.render();
    }
}

// Initialize Injury Types Chart
function initInjuryTypesChart() {
    const injuryTypesChartOptions = {
        series: [35, 25, 15, 10, 8, 7],
        chart: {
            type: 'pie',
            height: 350,
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent'
        },
        labels: ['عضلية', 'مفاصل', 'أربطة', 'عظام', 'أوتار', 'أخرى'],
        colors: ['#ff4560', '#00e396', '#feb019', '#4287f5', '#9c27b0', '#607d8b'],
        legend: {
            position: 'bottom',
            labels: {
                colors: '#9e9e9e'
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val.toFixed(1) + "%";
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Tajawal, sans-serif',
                fontWeight: 'bold'
            },
            dropShadow: {
                enabled: false
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        stroke: {
            width: 0
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '0%'
                },
                expandOnClick: true
            }
        }
    };
    
    if(document.querySelector("#injuryTypesChart")) {
        const injuryTypesChart = new ApexCharts(document.querySelector("#injuryTypesChart"), injuryTypesChartOptions);
        injuryTypesChart.render();
    }
}

// Initialize Body Map Chart
function initBodyMapChart() {
    const bodyMapChartOptions = {
        series: [{
            name: 'نسبة الإصابات',
            data: [30, 25, 15, 12, 10, 8]
        }],
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
                distributed: true,
                borderRadius: 5,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        colors: ['#ff4560', '#feb019', '#00e396', '#4287f5', '#9c27b0', '#607d8b'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val + "%";
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Tajawal, sans-serif',
                fontWeight: 'bold',
                colors: ['#fff']
            },
            offsetX: 30
        },
        stroke: {
            width: 0
        },
        xaxis: {
            categories: ['الركبة', 'الكاحل', 'الفخذ', 'أسفل الظهر', 'الكتف', 'الرسغ'],
            labels: {
                style: {
                    colors: '#9e9e9e',
                    fontSize: '14px',
                    fontFamily: 'Tajawal, sans-serif'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#9e9e9e',
                    fontSize: '14px',
                    fontFamily: 'Tajawal, sans-serif'
                }
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#bodyMapChart")) {
        const bodyMapChart = new ApexCharts(document.querySelector("#bodyMapChart"), bodyMapChartOptions);
        bodyMapChart.render();
    }
}

// Initialize Vital Signs Charts
function initVitalSignsCharts() {
    // Heart Rate Chart
    const heartRateChartOptions = {
        series: [{
            name: 'معدل ضربات القلب',
            data: [65, 68, 72, 75, 70, 68, 72]
        }],
        chart: {
            type: 'line',
            height: 120,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: ['#4287f5'],
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'معدل ضربات القلب';
                    }
                },
                formatter: function(value) {
                    return value + ' نبضة/دقيقة';
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#heartRateChart")) {
        const heartRateChart = new ApexCharts(document.querySelector("#heartRateChart"), heartRateChartOptions);
        heartRateChart.render();
    }
    
    // Stress Chart
    const stressChartOptions = {
        series: [45],
        chart: {
            height: 120,
            type: 'radialBar',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        colors: ['#feb019'],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '60%'
                },
                track: {
                    background: '#333',
                    margin: 0
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        color: '#feb019',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        offsetY: 5
                    }
                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['مستوى الإجهاد']
    };
    
    if(document.querySelector("#stressChart")) {
        const stressChart = new ApexCharts(document.querySelector("#stressChart"), stressChartOptions);
        stressChart.render();
    }
    
    // Sleep Chart
    const sleepChartOptions = {
        series: [68],
        chart: {
            height: 120,
            type: 'radialBar',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        colors: ['#ff4560'],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '60%'
                },
                track: {
                    background: '#333',
                    margin: 0
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        color: '#ff4560',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        offsetY: 5
                    }
                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['جودة النوم']
    };
    
    if(document.querySelector("#sleepChart")) {
        const sleepChart = new ApexCharts(document.querySelector("#sleepChart"), sleepChartOptions);
        sleepChart.render();
    }
    
    // Recovery Chart
    const recoveryChartOptions = {
        series: [75],
        chart: {
            height: 120,
            type: 'radialBar',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        colors: ['#00e396'],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '60%'
                },
                track: {
                    background: '#333',
                    margin: 0
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        color: '#00e396',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        offsetY: 5
                    }
                }
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['مؤشر الاستشفاء']
    };
    
    if(document.querySelector("#recoveryChart")) {
        const recoveryChart = new ApexCharts(document.querySelector("#recoveryChart"), recoveryChartOptions);
        recoveryChart.render();
    }
}

// Initialize Training Load Chart
function initTrainingLoadChart() {
    const trainingLoadChartOptions = {
        series: [{
            name: 'حمل التدريب',
            data: [320, 380, 420, 450, 400, 350, 300]
        }],
        chart: {
            height: 350,
            type: 'area',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['#00e396'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: {
            title: {
                text: 'وحدات حمل التدريب',
                style: {
                    color: '#9e9e9e'
                }
            },
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#trainingLoadChart")) {
        const trainingLoadChart = new ApexCharts(document.querySelector("#trainingLoadChart"), trainingLoadChartOptions);
        trainingLoadChart.render();
    }
}

// Initialize Acute:Chronic Ratio Chart
function initAcuteChronicRatioChart() {
    const acuteChronicRatioChartOptions = {
        series: [{
            name: 'نسبة الحادة:المزمنة',
            data: [0.8, 0.9, 1.1, 1.2, 1.3, 1.2, 1.1]
        }],
        chart: {
            height: 100,
            type: 'line',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: ['#4287f5'],
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'نسبة الحادة:المزمنة';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#acuteChronicRatioChart")) {
        const acuteChronicRatioChart = new ApexCharts(document.querySelector("#acuteChronicRatioChart"), acuteChronicRatioChartOptions);
        acuteChronicRatioChart.render();
    }
}

// Initialize Fatigue Index Chart
function initFatigueIndexChart() {
    const fatigueIndexChartOptions = {
        series: [{
            name: 'مؤشر التعب',
            data: [280, 300, 320, 340, 320, 310, 320]
        }],
        chart: {
            height: 100,
            type: 'line',
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: ['#ff4560'],
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: false
            },
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function() {
                        return 'مؤشر التعب';
                    }
                }
            },
            marker: {
                show: false
            }
        }
    };
    
    if(document.querySelector("#fatigueIndexChart")) {
        const fatigueIndexChart = new ApexCharts(document.querySelector("#fatigueIndexChart"), fatigueIndexChartOptions);
        fatigueIndexChart.render();
    }
}

// Initialize Model Performance Chart
function initModelPerformanceChart() {
    const modelPerformanceChartOptions = {
        series: [{
            name: 'الدقة',
            data: [75, 78, 80, 82, 85]
        }, {
            name: 'الحساسية',
            data: [70, 72, 75, 78, 80]
        }, {
            name: 'النوعية',
            data: [80, 82, 83, 85, 88]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['#00e396', '#4287f5', '#feb019'],
        xaxis: {
            categories: ['الإصدار 1.0', 'الإصدار 1.5', 'الإصدار 2.0', 'الإصدار 2.5', 'الإصدار 3.0'],
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: {
            title: {
                text: 'النسبة المئوية (%)',
                style: {
                    color: '#9e9e9e'
                }
            },
            min: 50,
            max: 100,
            labels: {
                style: {
                    colors: '#9e9e9e'
                },
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#modelPerformanceChart")) {
        const modelPerformanceChart = new ApexCharts(document.querySelector("#modelPerformanceChart"), modelPerformanceChartOptions);
        modelPerformanceChart.render();
    }
}

// Initialize Risk Factors Chart
function initRiskFactorsChart() {
    const riskFactorsChartOptions = {
        series: [{
            name: 'مساهمة عوامل الخطر',
            data: [25, 20, 15, 12, 10, 8, 10]
        }],
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '60%',
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        colors: ['#ff4560', '#feb019', '#00e396', '#4287f5', '#9c27b0', '#607d8b', '#ff9800'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                return val + "%";
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Tajawal, sans-serif',
                fontWeight: 'bold',
                colors: ['#fff']
            },
            offsetY: -20
        },
        xaxis: {
            categories: ['حمل التدريب', 'تاريخ الإصابات', 'جودة النوم', 'مستوى الإجهاد', 'التغذية', 'العمر', 'أخرى'],
            labels: {
                style: {
                    colors: '#9e9e9e',
                    fontSize: '14px',
                    fontFamily: 'Tajawal, sans-serif'
                },
                rotate: -45
            }
        },
        yaxis: {
            title: {
                text: 'نسبة المساهمة (%)',
                style: {
                    color: '#9e9e9e'
                }
            },
            labels: {
                style: {
                    colors: '#9e9e9e'
                },
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#riskFactorsChart")) {
        const riskFactorsChart = new ApexCharts(document.querySelector("#riskFactorsChart"), riskFactorsChartOptions);
        riskFactorsChart.render();
    }
}

// Initialize Team Comparison Chart
function initTeamComparisonChart() {
    const teamComparisonChartOptions = {
        series: [{
            name: 'مؤشر خطر الإصابة',
            data: [27, 32, 25, 30]
        }, {
            name: 'معدل الإصابات الفعلية',
            data: [22, 28, 20, 25]
        }],
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['#ff4560', '#00e396'],
        xaxis: {
            categories: ['فريقنا', 'المتوسط الدوري', 'أفضل فريق', 'أسوأ فريق'],
            labels: {
                style: {
                    colors: '#9e9e9e',
                    fontSize: '14px',
                    fontFamily: 'Tajawal, sans-serif'
                }
            }
        },
        yaxis: {
            title: {
                text: 'النسبة المئوية (%)',
                style: {
                    color: '#9e9e9e'
                }
            },
            labels: {
                style: {
                    colors: '#9e9e9e'
                },
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#teamComparisonChart")) {
        const teamComparisonChart = new ApexCharts(document.querySelector("#teamComparisonChart"), teamComparisonChartOptions);
        teamComparisonChart.render();
    }
}

// Initialize Seasonal Trends Chart
function initSeasonalTrendsChart() {
    const seasonalTrendsChartOptions = {
        series: [{
            name: 'مؤشر خطر الإصابة',
            data: [20, 25, 30, 35, 30, 25, 20, 25, 30, 25]
        }, {
            name: 'الإصابات الفعلية',
            data: [5, 8, 12, 15, 10, 7, 5, 8, 10, 7]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: [3, 3],
            dashArray: [0, 5]
        },
        colors: ['#ff4560', '#00e396'],
        xaxis: {
            categories: ['أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: [
            {
                title: {
                    text: 'مؤشر خطر الإصابة (%)',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    },
                    formatter: function(value) {
                        return value + '%';
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: 'عدد الإصابات',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    }
                }
            }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: [{
                formatter: function(value) {
                    return value + '%';
                }
            }, {
                formatter: function(value) {
                    return value + ' إصابة';
                }
            }]
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#seasonalTrendsChart")) {
        const seasonalTrendsChart = new ApexCharts(document.querySelector("#seasonalTrendsChart"), seasonalTrendsChartOptions);
        seasonalTrendsChart.render();
    }
}

// Initialize Match Density Chart
function initMatchDensityChart() {
    const matchDensityChartOptions = {
        series: [{
            name: 'مؤشر خطر الإصابة',
            data: [20, 25, 35, 40, 30]
        }, {
            name: 'عدد المباريات',
            data: [1, 2, 3, 4, 2]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: [3, 3]
        },
        colors: ['#ff4560', '#4287f5'],
        xaxis: {
            categories: ['مباراة كل أسبوعين', 'مباراة كل أسبوع', 'مباراتين كل أسبوع', '3 مباريات كل أسبوع', 'مباراة كل 3 أيام'],
            labels: {
                style: {
                    colors: '#9e9e9e',
                    fontSize: '12px'
                },
                rotate: -45
            }
        },
        yaxis: [
            {
                title: {
                    text: 'مؤشر خطر الإصابة (%)',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    },
                    formatter: function(value) {
                        return value + '%';
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: 'عدد المباريات',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    }
                }
            }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: [{
                formatter: function(value) {
                    return value + '%';
                }
            }, {
                formatter: function(value) {
                    return value + ' مباراة';
                }
            }]
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#matchDensityChart")) {
        const matchDensityChart = new ApexCharts(document.querySelector("#matchDensityChart"), matchDensityChartOptions);
        matchDensityChart.render();
    }
}

// Initialize Recovery Metrics Chart
function initRecoveryMetricsChart() {
    const recoveryMetricsChartOptions = {
        series: [{
            name: 'مؤشر الاستشفاء',
            data: [65, 70, 75, 80, 85, 80, 75]
        }, {
            name: 'مستوى الإجهاد',
            data: [55, 50, 45, 40, 35, 40, 45]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['#00e396', '#ff4560'],
        xaxis: {
            categories: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'],
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: {
            title: {
                text: 'النسبة المئوية (%)',
                style: {
                    color: '#9e9e9e'
                }
            },
            labels: {
                style: {
                    colors: '#9e9e9e'
                },
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter: function(value) {
                    return value + '%';
                }
            }
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#recoveryMetricsChart")) {
        const recoveryMetricsChart = new ApexCharts(document.querySelector("#recoveryMetricsChart"), recoveryMetricsChartOptions);
        recoveryMetricsChart.render();
    }
}

// Initialize Sleep Quality Chart
function initSleepQualityChart() {
    const sleepQualityChartOptions = {
        series: [{
            name: 'جودة النوم',
            data: [60, 65, 70, 75, 68, 72, 68]
        }, {
            name: 'مدة النوم',
            data: [6.5, 7, 7.5, 8, 7, 7.5, 7]
        }],
        chart: {
            height: 350,
            type: 'line',
            fontFamily: 'Tajawal, sans-serif',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        colors: ['#ff4560', '#4287f5'],
        xaxis: {
            categories: ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6', 'اليوم 7'],
            labels: {
                style: {
                    colors: '#9e9e9e'
                }
            }
        },
        yaxis: [
            {
                title: {
                    text: 'جودة النوم (%)',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    },
                    formatter: function(value) {
                        return value + '%';
                    }
                }
            },
            {
                opposite: true,
                title: {
                    text: 'مدة النوم (ساعة)',
                    style: {
                        color: '#9e9e9e'
                    }
                },
                labels: {
                    style: {
                        colors: '#9e9e9e'
                    }
                }
            }
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#9e9e9e'
            }
        },
        tooltip: {
            theme: 'dark',
            y: [{
                formatter: function(value) {
                    return value + '%';
                }
            }, {
                formatter: function(value) {
                    return value + ' ساعة';
                }
            }]
        },
        grid: {
            borderColor: '#1a1a1a',
            opacity: 0.2
        }
    };
    
    if(document.querySelector("#sleepQualityChart")) {
        const sleepQualityChart = new ApexCharts(document.querySelector("#sleepQualityChart"), sleepQualityChartOptions);
        sleepQualityChart.render();
    }
}

// Add event listeners
function addEventListeners() {
    // Refresh button
    const refreshBtn = document.querySelector('.refresh-btn');
    if(refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.classList.add('rotating');
            setTimeout(() => {
                this.classList.remove('rotating');
                showNotification('تم تحديث البيانات بنجاح', 'success');
            }, 1000);
        });
    }
    
    // Export button
    const exportBtn = document.querySelector('.export-btn');
    if(exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('جاري تصدير التقرير...', 'info');
            setTimeout(() => {
                showNotification('تم تصدير التقرير بنجاح', 'success');
            }, 1500);
        });
    }
    
    // Recommendation buttons
    const applyBtns = document.querySelectorAll('.recommendation-actions .btn-primary');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const recommendation = this.closest('.recommendation-item');
            const title = recommendation.querySelector('.recommendation-title').textContent;
            showNotification('تم تطبيق التوصية: ' + title, 'success');
            recommendation.style.opacity = '0.5';
        });
    });
    
    const postponeBtns = document.querySelectorAll('.recommendation-actions .btn-secondary');
    postponeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const recommendation = this.closest('.recommendation-item');
            const title = recommendation.querySelector('.recommendation-title').textContent;
            showNotification('تم تأجيل التوصية: ' + title, 'info');
        });
    });
    
    // Player action buttons
    const playerDetailBtns = document.querySelectorAll('.player-actions .btn-primary');
    playerDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const player = this.closest('.player-card');
            const name = player.querySelector('.player-name').textContent;
            showNotification('جاري عرض تفاصيل اللاعب: ' + name, 'info');
        });
    });
    
    const playerRecommendBtns = document.querySelectorAll('.player-actions .btn-secondary');
    playerRecommendBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const player = this.closest('.player-card');
            const name = player.querySelector('.player-name').textContent;
            showNotification('تم إنشاء توصية جديدة للاعب: ' + name, 'success');
        });
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
    }
    
    notification.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
