YUI({combine: true}).use('datatable', 'charts', 'node','json-parse', function(Y){
    var i = 0,
        CLASSES = {
            chart_con: 'chart-container',
            con: 'container'
        }, 
        DOT = '.',
        TYPES = {
            single_choice: {
                horiz: 'bar',
                vert: 'column',
                pie: 'pie'
            },
            matrix: {
                menu: 'bar',
                simple: 'bar',
                vert: 'column'
            }
        },
        COL_CHOICES = 'col_choices',
        container = Y.one('body'),
        chartTmpl = Y.one(DOT + CLASSES.chart_con),
        info = data,
        ques = info.struct.questions,
        summary = info.summary,
        charts = [];
        
        for(var j in ques){
            var family = ques[j].type.family,
                subtype = ques[j].type.subtype,
                chart_type = TYPES[family][subtype],
                cols = ques[j].structure.cols,
                rows = ques[j].structure.rows,
                col_choices = ques[j].structure[COL_CHOICES],
                chart_copy = chartTmpl.cloneNode(true).removeClass('hidden'),
                munged_info = {
                    structure: ques[j],
                    summary: info.summary[j]
                }, chart;
            
            container.appendChild(chart_copy);
            if(subtype === 'menu'){
                family += subtype;
            }
            munged_info = Loader.convertDataForGraph(munged_info, family);
            chart = new Y.Chart({
                dataProvider: munged_info,
                render: chart_copy,
                type: chart_type,
                horizontalGridlines: true,
                verticalGridlines: true
            });
        }




});
