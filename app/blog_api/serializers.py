# -*- encoding: utf-8 -*-
from rest_framework import serializers
from blog.models import *

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'text',
            'author',
            'created',
            'applause',
        ]

class ArticlePreviewSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    comments = serializers.PrimaryKeyRelatedField(
        read_only=True,
        many=True
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
            'comments'
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    comments = CommentSerializer(
        read_only=True,
        many=True
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
            'comments'
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
