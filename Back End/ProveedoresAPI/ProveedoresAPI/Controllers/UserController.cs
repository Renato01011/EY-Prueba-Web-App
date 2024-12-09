using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProveedoresAPI.Data;
using ProveedoresAPI.Models;
using ProveedoresAPI.Utilities;

namespace ProveedoresAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserData _userData;
        private readonly JwtProvider _jwtProvider;
        public UserController(UserData userdata, JwtProvider jwtProvider)
        {
            _userData = userdata;
            _jwtProvider = jwtProvider;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            User userToCompare = await _userData.getUserByUsername(user);
            string temp = _jwtProvider.encriptSHA256(user.Password!);
            if (userToCompare.Password != null)
            {
                if (userToCompare.Password == _jwtProvider.encriptSHA256(user.Password!)) {
                    return StatusCode(StatusCodes.Status200OK, new { token = _jwtProvider.GenerateToken(user) });
                }
                else
                {
                    return StatusCode(452, new { });
                }
            }
            else
            {
                return StatusCode(452, new { });
            }
        }
    }
}
