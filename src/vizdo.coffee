log = DO.log d3.select("#log")

cluster = "dev1"
update = (cluster) ->
  settings = presets[cluster]
  settings.log = log
  DO.journal( settings, (journal) ->
    DO.signalsource( settings, (source) ->
      buildSignalGraph( journal, source )
    )
  )
update cluster
# settings = DO.settings
# settings.log =  DO.log( d3.select("#log") )
# DO.signalsource( settings, (source) -> source.subscribe( (evt) -> settings.log "hi there from  #{evt.type}" ))