const {client} = require('./db.js')

class Project {
    constructor(id, name, description, tags, github, status, date_created, last_updated, author, collaborators){
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.github = github;
        this.status = status;
        this.date_created = date_created;
        this.last_updated = last_updated;
        this.author = author;
        this.collaborators = collaborators;
    }
}

// TODO: query add functionality 
function createProject()
{
    const 
    { 
        id, 
        name, 
        description,
        tags,
        github,
        status, 
        date_created, 
        last_updated, 
        author, 
        collaborators
    } = req.body;

}

// TODO: query delete functionality 
function deleteProject(){}

// TODO: query modify functionality to add a collaborator
function addCollaborator(){}

// TODO: query modify functionality to delete a collaborator
function deleteCollaborator(){}

// TODO: query modify functionality to update last_updated 
function update(){}

module.exports = {
    createProject,
    deleteProject,
    addCollaborator,
    deleteCollaborator,
    update
}