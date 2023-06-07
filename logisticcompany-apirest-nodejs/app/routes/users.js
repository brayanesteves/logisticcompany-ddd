const express            = require("express");
const { createUser, createUserSingle, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword } = require("../controllers/mongodb/user");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const router             = express.Router();

router.post  (      '/register-single', createUserSingle);
router.post  (             '/register', createUser);
router.post  ('/reset-password/:token', resetPassword);
router.post  ('/forgot-password-token', forgotPasswordToken);
router.put   (       '/password-reset', authMiddleware, updatePassword);
router.post  (                '/login', loginUserCtrl);
router.get   (            '/all-users', authMiddleware, isAdmin, getUsers);
router.get   (         '/get-user/:id', authMiddleware, isAdmin, getUser);
router.get   (               '/logout', logout);
router.delete(      '/delete-user/:id', authMiddleware, isAdmin, deleteUser);
router.put   (       '/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put   (     '/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put   (      '/update-user/:id', authMiddleware, updatedUser);
router.get   (   '/refresh-token-user', handleRefreshToken);

module.exports = router;