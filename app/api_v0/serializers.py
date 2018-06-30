# -*- encoding: utf-8 -*-
from rest_framework import serializers
from blog.models import *



class ArticlePreviewSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Article
        fields = [
            'id',
            'author',
            'title',
            'created_at',
            'announce_text',
            'url',
            'tags',
        ]

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'id',
            'tag_name',
        ]

class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = [
            'title',
            'created_at',
            'text',
            'author',
            'tags',
        ]



class ArchiveArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'slug',
            'title',
            'created_at',
        ]

class YearSerializer(serializers.ModelSerializer):
    articles = ArchiveArticleSerializer(many=True, read_only=True)

    class Meta:
        model = Year
        fields = [
            'id',
            'year',
            'articles'
        ]
