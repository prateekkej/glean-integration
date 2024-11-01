class User {
    constructor(email, name) {
        this.email = email
        this.name = name
    }
    setEmail(email) { this.email = email }
    setUserId(userId) { this.userId = userId }
    setName(name) { this.name = name }
    setActive(flag) { this.isActive = flag }

    getJSON() { return this }
}

module.exports = User