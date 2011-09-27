var Loader = {
    triggers: {
        length: 'length'
    },
    loadData: function(json){
        if(json){
            //load as json data
            window.data = json;
        }
    },
    convertDataForGraph: function(info, family){
        if(!info){
            throw Exception("Data can't be null");
        }
        return this.convert[family].call(this, info.structure, info.summary);
    },
    convert: {
        matrix: function(structure, summary){
            var munged = [],
                i = 0,
                rows = structure.structure.rows,
                cols = structure.structure.cols,
                len = rows.length,
                clen = cols.length;
            
            for(; i < len; i++){
                var j = 0,
                    d = {},
                    rid = rows[i].id;
                d.category = rows[i].text;
                for(; j < clen; j++){
                    var cid = cols[j].id;
                    d[cols[j].text] = summary.summary.options[rid].options[cid].count;
                }
                munged.push(d);
            }

            return munged;
        },
        single_choice: function(structure, summary){
            var munged = [],
                i = 0,
                len = structure.structure.rows.length;
            
            for(; i < len; i++){
                var id = structure.structure.rows[i].id;
                munged.push({
                    category: structure.structure.rows[i].text,
                    values: summary.summary.options[id].count

                });
            }
            return munged;
        }
    }

};
