from django.db import models

from main.abstract.models import AbstractModel, AbstractManager


class CommentManager(AbstractManager):
    pass


class Comment(AbstractModel):
    post = models.ForeignKey("main_post.Post", on_delete=models.CASCADE)
    author = models.ForeignKey("main_user.User", on_delete=models.CASCADE)

    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = CommentManager()

    def __str__(self):
        return self.author.name