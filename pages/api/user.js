export default async function handler(req, res) {
  let admin = {
    email: "anasmuostafa@gmail.com",
    password: "anasmuostafa@gmail.com",
  };
  /** ------------------------------------------
   * GET All Courses: `/api/courses`
   * ----------------------------------------- */
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      console.log({admin})
      if (!email || !password) {
        return res.status(400).json({ error: "missing email or password" });
      } else {
        if (admin.email == email && admin.password == password) {
          return res.status(200).json(admin);
        } else {
          return res.status(400).json({ error: "wrong email or password " });
        }
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }
}
