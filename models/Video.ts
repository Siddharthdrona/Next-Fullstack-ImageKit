import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;

  title: string;
  description: string;

  videoUrl: string;
  thumbnailUrl: string;

  controls?: boolean;

  uploader?: mongoose.Types.ObjectId;

  views?: number;

  likes?: number;

  category?: string;

  tags?: string[];

  duration?: number;

  isPublic?: boolean;

  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    controls: {
      type: Boolean,
      default: true,
    },

    uploader: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "General",
    },

    tags: {
      type: [String],
      default: [],
    },

    duration: {
      type: Number,
      default: 0,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    transformation: {
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },

      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },

      quality: {
        type: Number,
        default: 80,
        min: 1,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  },
);

videoSchema.index({ title: "text", description: "text" });

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
