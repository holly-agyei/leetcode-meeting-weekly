from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_mail import Mail, Message
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER', "agyeiholy978@gmail.com")

# Initialize mail
mail = Mail(app)

# Initial schedule data
INITIAL_SCHEDULE = [
    {"day": "Monday", "session": "Leetcode", "description": "5m understand, 25m solve, 15m discuss", "name": ""},
    {"day": "Tuesday", "session": "Leetcode", "description": "5m understand, 25m solve, 15m discuss", "name": ""},
    {"day": "Wednesday", "session": "Teaching 1", "description": "30m teach, 15m example", "name": ""},
    {"day": "Thursday", "session": "Mock Interview", "description": "Easy/medium Qs, focus on breakdown", "name": ""},
    {"day": "Friday", "session": "Leetcode", "description": "5m understand, 25m solve, 15m discuss", "name": ""},
    {"day": "Saturday", "session": "Teaching 2", "description": "30m teach, 15m example", "name": ""},
    {"day": "Sunday", "session": "Driver Coding", "description": "Live solving with shared screen", "name": ""}
]

# Load schedule from environment variable or use initial schedule
def load_schedule():
    schedule_json = os.getenv('SCHEDULE_DATA')
    if schedule_json:
        try:
            return json.loads(schedule_json)
        except json.JSONDecodeError:
            return INITIAL_SCHEDULE
    return INITIAL_SCHEDULE

# Load members from environment variable or use initial members
def load_members():
    members_json = os.getenv('MEMBERS_DATA')
    if members_json:
        try:
            return json.loads(members_json)
        except json.JSONDecodeError:
            return ["holy@leetcodegroup.com"]
    return ["holy@leetcodegroup.com"]

@app.route('/')
def index():
    schedule = load_schedule()
    return render_template('index.html', schedule=schedule)

@app.route('/members')
def members():
    member_list = load_members()
    return render_template('members.html', members=member_list)

@app.route('/add_member', methods=['POST'])
def add_member():
    email = request.form.get('email')
    if email:
        members = load_members()
        if email not in members:
            members.append(email)
            # In production, you would need to update the environment variable
            # This is just for demonstration
            print(f"Member added: {email}")
    return redirect(url_for('members'))

@app.route('/remove_member', methods=['POST'])
def remove_member():
    email = request.form.get('email')
    if email:
        members = load_members()
        if email in members:
            members.remove(email)
            # In production, you would need to update the environment variable
            # This is just for demonstration
            print(f"Member removed: {email}")
    return redirect(url_for('members'))

@app.route('/update_schedule', methods=['POST'])
def update_schedule():
    data = request.json
    schedule = load_schedule()
    
    # Update the name for the specified day
    for item in schedule:
        if item['day'] == data['day']:
            item['name'] = data['name']
            break
    
    # In production, you would need to update the environment variable
    # This is just for demonstration
    print(f"Schedule updated for {data['day']}: {data['name']}")
    
    return jsonify({"status": "success"})

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        schedule = load_schedule()
        members = load_members()
        
        # Format schedule for email as HTML table
        email_html = f"""
        <p>Hi Team,</p>
        <p>Here's the updated schedule for this week:</p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; font-family:Arial, sans-serif;">
            <tr style="background:#6366f1; color:#fff;">
                <th>Day</th>
                <th>Session</th>
                <th>Name</th>
            </tr>
            {''.join([
                f"<tr><td>{item['day']}</td><td>{item['session']}</td><td>{item['name'] or 'Unassigned'}</td></tr>"
                for item in schedule
            ])}
        </table>
        <p style="margin-top:2em;">See you at 11 PM EST daily!</p>
        """
        
        # Create email message
        msg = Message(
            subject="Updated Leetcode Weekly Schedule",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=members
        )
        msg.html = email_html
        
        # Send email
        mail.send(msg)
        return jsonify({"status": "success", "message": "Email sent successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 