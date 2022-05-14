const ForbiddenAccessException = require("../Exceptions/ForbiddenAccessException");
const ResourceNotFoundException = require("../Exceptions/ResourceNotFoundException");

class AuthorizationService {
  verifyPermission(resource, user) {
    if (!resource) {
      throw new ResourceNotFoundException();
    }

    if (resource.user_id !== user.id) {
      throw new ForbiddenAccessException();
    }
  }
}

module.exports = new AuthorizationService();
