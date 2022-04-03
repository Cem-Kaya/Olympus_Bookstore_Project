from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy 

app= Flask (__name__)

@app.route("/members")
def mem():
    return {"members":["Cem","Baha","Murat","Emre","ugur","Can"] }


@app.route("/")
def index():
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)