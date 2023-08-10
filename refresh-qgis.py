
import time
import threading

def reload_layer():
    while True:
        layer=qgis.utils.iface.mapCanvas().layers()[0]
        layer.dataProvider().forceReload()
        layer.triggerRepaint()
        time.sleep(2)

reload_thread = threading.Thread(target=reload_layer)
reload_thread.start()


# exec(Path('/Users/rrullo/Desktop/sncf-geoloc/refresh-qgis.py').read_text())