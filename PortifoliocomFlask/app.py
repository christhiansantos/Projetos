
from flask import Flask, render_template, redirect, request
import sqlite3

app = Flask(__name__)

""" check_same_thread=False. Isso permitirá que a conexão seja usada por diferentes threads: """
banco = sqlite3.connect('mensagens.db', check_same_thread=False)

cursor = banco.cursor()

#cursor.execute("create table mensagens (Nome TEXT NOT NULL, Email NOT NULL, Mensagem TEXT NOT NULL)")

#cursor.execute("INSERT INTO mensagens VALUES ('cris rodrigues ','chris@teste','quase la kk')")


""" cursor.execute("SELECT * FROM mensagens")
print(cursor.fetchall()) """



@app.route("/message", methods=['POST'])  
def message():
    nome = request.form.get('nome')
    email = request.form.get('email')
    mensagem = request.form.get('mensagem')


    cursor.execute('INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)', (nome, email, mensagem))
    print(nome,email,mensagem)

    banco.commit()
    #banco.close()
    return redirect('contact')
   

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/projects')
def projects():
    return render_template("projects.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")
  



if __name__ in "__main__":
    app.run(debug=True)
  

