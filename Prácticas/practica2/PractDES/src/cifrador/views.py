import os
from django.shortcuts import render
from Crypto.Cipher import DES
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
# Create your views here.

modes = [DES.MODE_ECB, DES.MODE_CBC, DES.MODE_CFB, DES.MODE_OFB];
modeString = ['ECB', 'CBC', 'CFB', 'OFB']

@csrf_exempt
def index(request):
    if request.method == 'POST':
        cifrado = request.POST['cipherRadio']
        modo = int(request.POST['modeRadio'], 10)
        image = request.FILES['archivo']
        key = request.POST['key']
        vector = request.POST['vector']

        des = DES.new(key, modes[modo], vector);
        new_image = open('../../' + image.name.split('.')[0] + '_' + cifrado + modeString[modo] + '.bmp','wb')
        new_image.write(image.read(54))
        bytes_to_encrypt = image.read()
        if cifrado == 'c':
            new_image.write(des.encrypt(bytes_to_encrypt))
        else:
            new_image.write(des.decrypt(bytes_to_encrypt))
        
    return render(request, 'index.html', {})