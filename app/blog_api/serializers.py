# -*- encoding: utf-8 -*-
from rest_framework import serializers
from blog.models import *
from album.models import *
from django.contrib.auth.models import User



class ImageSerializer(serializers.ModelSerializer):
    # image = serializers.SlugRelatedField(
    #     read_only=True,
    #     slug_field="url"
    # )

    class Meta:
        model = AlbumImage
        fields = [
            'image',
            'alt'
        ]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'text',
            'author',
            'created',
            'applause',
        ]

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'email',
            'username',
            'last_name'
        ]

class ArticlePreviewSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    comments = serializers.PrimaryKeyRelatedField(
        read_only=True,
        many=True
    )
    preview = ImageSerializer(
        read_only=True
    )
    author = AuthorSerializer(
        read_only=True
    )

    class Meta:
        model = Article
        fields = [
            'author',
            'title',
            'applause',
            'created_at',
            'announce_text',
            'url',
            'tags',
            'slug',
            'comments',
            'preview'
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    comments = CommentSerializer(
        read_only=True,
        many=True
    )
    preview = ImageSerializer(
        read_only=True
    )
    author = AuthorSerializer(
        read_only=True
    )

    class Meta:
        model = Article
        fields = [
            'title',
            'created_at',
            'text',
            'author',
            'tags',
            'applause',
            'comments',
            'preview',
            'author'
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'tag_name'
        ]


class ArchiveArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'slug',
            'title',
            'created_at'
        ]


class YearSerializer(serializers.ModelSerializer):
    articles = ArchiveArticleSerializer(many=True, read_only=True)

    class Meta:
        model = Year
        fields = [
            'year',
            'articles'
        ]
