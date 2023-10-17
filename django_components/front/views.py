from django.shortcuts import render, HttpResponse, render_to_response

def index(request, param=''):
	return render_to_response('layout/base.html')


#### LAYOUT VIEWS #### 

def header(request):
	return render_to_response('layout/header.html')

def main(request):
	return render_to_response('section/main.html')

def footer(request):
	return render_to_response('layout/footer.html')


#### SECTION VIEWS #### 

def home(request):
	return render_to_response('partial/onepage.html')

# def about_us(request):
# 	return render_to_response('partial/onepage.html')

# def services(request):
# 	return render_to_response('partial/onepage.html')

# def products(request):
# 	return render_to_response('partial/onepage.html')

# def contact(request):
# 	return render_to_response('partial/onepage.html')


def challenge(request, challenge=""):
	return HttpResponse(str(challenge) + '.LuQfyuS7LYdoK-grGkjE_j762MMlVb6AoJkx1D3FQvY')
