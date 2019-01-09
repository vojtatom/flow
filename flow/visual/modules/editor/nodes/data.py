from .base import Node
from ..model import dataset
from visual.modules.numeric.io import data, cdata


class DataNode(Node):
    structure = {
            'title' : {
                'type': 'display',
                'value' : 'dataset',
            },
            'code' : {
                'type': 'input',
                'value' : '',
            },
            'type' : {
                'type': 'input',
                'value' : 'scipy',
            },
        }

    ins = []
    out = ['dataset']
    title = 'dataset'
    
    def __init__(self, id, data):
        self.id = id

        #TODO perform checks...

        ## get path to dataset
        path = dataset(data['code'])

        if data['type'] == 'scipy':
            self.data = data(path)
        else:
            self.data = cdata(path)

    def call(self, indata):
        return self.data