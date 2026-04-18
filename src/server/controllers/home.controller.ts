import { Request, Response, NextFunction } from "express";
import { Post } from "../models/post";
import { ApiError } from "../utils/apiErrors";

export const getHome = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 10;
    let page = 1;

    if (typeof req.query.page === "string") {
      const parsed = parseInt(req.query.page);
      page = parsed > 0 ? parsed : 1;
    }

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments({});
    const nextPage = page + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: "/",
    });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await Post.findById(req.params.id);

    if (!data) return next(new ApiError(404, "Post not found"));

    res.render("post", {
      locals: {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      },
      data,
      currentRoute: `/post/${req.params.id}`,
    });
  } catch (err) {
    next(err);
  }
};

export const searchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchTerm = req.body.searchTerm || "";

    const clean = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(clean, "i") } },
        { body: { $regex: new RegExp(clean, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals: {
        title: "Seach",
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      },
      currentRoute: "/",
    });
  } catch (err) {
    next(err);
  }
};

export const getAbout = (req: Request, res: Response) => {
  res.render("about");
};
