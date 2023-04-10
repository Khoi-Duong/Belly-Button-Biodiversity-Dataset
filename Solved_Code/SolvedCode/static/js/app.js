// Samples.json from URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Function to Create Horizontal Plot
function horizontalPlot(samples) {
    d3.json(url).then(function(samples) {
        var sampleValues = samples.samples[0].sample_values.slice(0, 10).reverse();
        var otuIds = samples.samples[0].otu_ids.slice(0, 10).reverse();
        var otuLabels = samples.samples[0].otu_labels.slice(0, 10).reverse();
        var trace = {
            x : sampleValues,
            y : otuIds.map((id) => "OTU " + id),
            text : otuLabels,
            color : "blue",
            type : "bar",
            orientation : "h" 
        };
        var data = [trace];
        var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 0,
                b: 30
            }
        };
        Plotly.newPlot("bar", data, layout);    
    });  
}

// Function to Create Bubble Plot
function bubblePlot(samples) {
    d3.json(url).then(samples => {
        var trace = {
            x : samples.samples[0].otu_ids,
            y : samples.samples[0].sample_values,
            text : samples.samples[0].otu_labels,
            mode : "markers",
            marker : {
                size : samples.samples[0].sample_values,
                color : samples.samples[0].otu_ids,
                colorscale: "Earth"
            }
        };
        var data = [trace];
        var layout = {
            xaxis:{title: "OTU IDs"},
            margin: {
                l: 100,
                r: 100,
                t: 50,
                b: 100
            },
            height: 500,
            width: 1100
        };
        Plotly.newPlot("bubble", data, layout);
    });   
}

//Function to Display Individual Demographic Information
function demoGraphic(samples) {
    d3.json(url).then(samples => {
        var data = samples.metadata;
        var filteredData = data.filter(meta => meta.id == samples)[0];
        var dataIndex = data[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(dataIndex).forEach(([key, value]) => {
            demographicInfo.append("h5").text(`${key} : ${value}`)});
    });
}

//Function for Change Event
function optionChanged(id) {
        horizontalPlot(id);
        bubblePlot(id);
        demoGraphic(id);
};


// Function for Initial Dashboard and Dropdown Menu
function init(samples) {
    d3.json(url).then(function(samples) {
        var dropdownMenu = d3.select("#selDataset");
        console.log(samples);
        horizontalPlot(samples);
        bubblePlot(samples);
        demoGraphic(samples);

        
        var names = samples.names;
        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", id);
        });
    });
}

init();

