import mongoose, { Schema, Types } from "mongoose";
import type { IUser } from "../../shared/types/user.type";
import { GenderEnum, RoleEnum } from "../../shared/enums/user.enum";
import * as userConstants from "../../shared/constants/user.constant";
import { hash } from "../../utils/hash.util";
import { encrypt, decrypt } from "../../utils/encryption.util";

const userSchema = new Schema<IUser>(
  {
    // Required Info
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: userConstants.NAME.MIN_LENGTH,
      maxlength: userConstants.NAME.MAX_LENGTH,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: userConstants.NAME.MIN_LENGTH,
      maxlength: userConstants.NAME.MAX_LENGTH,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
      validate: userConstants.BIRTH_DATE.VALIDATOR,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: userConstants.EMAIL.REGEX,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      required: true,
    },

    // Optional Info
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      minlength: userConstants.ADDRESS.MIN_LENGTH,
      maxlength: userConstants.ADDRESS.MAX_LENGTH,
    },

    confirmEmail: Date,

    profilePicture: {
      type: String,
      trim: true,
      maxlength: userConstants.PROFILE_PICTURE.MAX_LENGTH,
    },
    profilePicturePublicId: {
      type: String,
      trim: true,
      maxlength: userConstants.PROFILE_PICTURE_PUBLIC_ID.MAX_LENGTH,
    },

    friends: [{ type: Types.ObjectId, ref: "User" }],

    // Audit / Soft Delete
    deletedAt: Date,
    deletedBy: { type: Types.ObjectId, ref: "User" },
    restoredAt: Date,
    restoredBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ deletedAt: 1 });

//Virtual for fullName
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save Hook: Hash Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (this.password && this.password.startsWith("$2")) return;
  this.password = await hash(this.password);
});

// Pre-update Hook: Hash Password
userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate() as any;
  if (update.password && !update.password.startsWith("$2")) {
    update.password = await hash(update.password);
  }
});

// Pre-save Hook: Encrypt Phone
userSchema.pre("save", function () {
  if (!this.isModified("phone") || !this.phone) return;
  const isPlainPhone = /^[\d\s+()-]+$/.test(this.phone);
  if (!isPlainPhone) return;
  this.phone = encrypt(this.phone);
});

// Pre-update Hook: Encrypt Phone
userSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate() as any;

  if (update.phone) {
    const isPlainPhone = /^[\d\s+()-]+$/.test(update.phone);
    if (isPlainPhone) {
      update.phone = encrypt(update.phone);
    }
  }
});

userSchema.post(["find", "findOne"], function (docs: any) {
  const decryptPhone = (doc: any) => {
    if (doc?.phone && !/^[\d\s+()-]+$/.test(doc.phone)) {
      try {
        doc.phone = decrypt(doc.phone);
      } catch {}
    }
  };

  if (Array.isArray(docs)) {
    docs.forEach(decryptPhone);
  } else {
    decryptPhone(docs);
  }
});

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
